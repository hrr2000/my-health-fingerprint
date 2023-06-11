import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
  Session,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { OrganizationModel, UserModel } from "./models";
import { dbConnect } from "@/server/db";
import { routes } from "@/routes";
import { PageEntititesType } from "@/types/application";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60,
  },

  callbacks: {
    jwt({ token, user }) {
      // on user sign in user object exists
      if (user) {
        token.name = user.firstName + " " + user.lastName;
        token.picture = user.picture; // because it's not a social login
        token.nationalId = user.nationalId;
        token.orgName = user.orgName;
        token.orgId = user.orgId;
        token.jobTitle = user.jobTitle;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
        session.user.nationalId = token.nationalId;
        session.user.orgId = token.orgId;
        session.user.jobTitle = token.jobTitle;
        session.user.orgName = token.orgName;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      authorize: async (creds): Promise<any> => {
        await dbConnect();
        const user = await UserModel.findOne({
          nationalId: creds?.nationalId,
          organizations: {
            $elemMatch: {
              org_id: creds?.selectedOrgId,
              password: creds?.password,
            },
          },
        });

        if (!user) {
          return null;
        }
        const { _id, first_name, last_name, organizations } = user;
        const selectedOrg = organizations.find(
          (org) => org.org_id.toString() === creds?.selectedOrgId
        );
        if (!selectedOrg) {
          return null;
        }
        const { org_name, org_id, email, picture, jobTitle } = selectedOrg;

        return {
          id: _id,
          firstName: first_name,
          lastName: last_name,
          orgName: org_name,
          email,
          picture,
          jobTitle,
          orgId: org_id,
          nationalId: creds?.nationalId,
        };
      },
      credentials: {
        selectedOrgId: {},
        nationalId: {},
        password: {},
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
};

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      nationalId: string;
      orgId: string;
      orgName: string;
      jobTitle: string;
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    firstName: string;
    lastName: string;
    orgId: string;
    orgName: string;
    email: string;
    picture: string;
    jobTitle: string;
    nationalId: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    orgId: string;
    orgName: string;
    nationalId: string;
    jobTitle: string;
  }
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

export const getServerAuthZSession = async (
  session: Session,
  entityToAccess: PageEntititesType,
  options = { redirectTo: "/dashboard/home" }
) => {
  await dbConnect();

  const doc = await UserModel.findOne(
    {
      nationalId: session.user.nationalId,
      "organizations.org_name": session.user.orgName,
      "organizations.org_id": session.user.orgId,
    },
    { "organizations.roles.$": true, _id: false }
  );
  const userRoles = doc.organizations[0].roles;

  if (!userRoles && entityToAccess) {
    return {
      redirect: {
        permanent: false,
        destination: options.redirectTo,
      },
    };
  }

  const organizationSpecificRolePermissions =
    await OrganizationModel.aggregate<{
      _id: string;
      permissions: string[];
    }>([
      { $match: { name: session.user.orgName } },
      { $project: { _id: false, name: false, updatedAt: false } },
      { $unwind: "$roles" },
      { $match: { "roles._id": { $in: userRoles || [] } } },
      { $unwind: "$roles.permissions" },
      {
        $match: {
          "roles.permissions": {
            $regex:
              /^(patients|collections|organizations|users|roles|settings)/,
          },
        },
      },
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                {
                  case: {
                    $regexMatch: {
                      input: "$roles.permissions",
                      regex: /^patients/,
                    },
                  },
                  then: "patients",
                },
                {
                  case: {
                    $regexMatch: {
                      input: "$roles.permissions",
                      regex: /^collections/,
                    },
                  },
                  then: "collections",
                },
                {
                  case: {
                    $regexMatch: {
                      input: "$roles.permissions",
                      regex: /^organizations/,
                    },
                  },
                  then: "organizations",
                },
                {
                  case: {
                    $regexMatch: {
                      input: "$roles.permissions",
                      regex: /^users/,
                    },
                  },
                  then: "users",
                },
                {
                  case: {
                    $regexMatch: {
                      input: "$roles.permissions",
                      regex: /^roles/,
                    },
                  },
                  then: "roles",
                },
                {
                  case: {
                    $regexMatch: {
                      input: "$roles.permissions",
                      regex: /^settings/,
                    },
                  },
                  then: "settings",
                },
              ],
            },
          },
          permissions: {
            $push: "$roles.permissions",
          },
        },
      },
    ]);

  const pageSpecificPermissions = organizationSpecificRolePermissions.find(
    (e) => e._id === entityToAccess
  );

  if (!pageSpecificPermissions && entityToAccess) {
    return {
      redirect: {
        permanent: false,
        destination: options.redirectTo,
      },
    };
  }

  // remove from links any thing that is not in the array
  const filteredPages = routes.dashboardPages.filter(
    (page) =>
      !page.entity ||
      organizationSpecificRolePermissions.find(
        (e) => e._id.toLowerCase() === page.entity.toLowerCase()
      )
  );

  // send the updated links + page specific permissions
  return {
    props: {
      user: session.user,
      links: filteredPages,
      pageSpecificPermissions: pageSpecificPermissions
        ? pageSpecificPermissions.permissions
        : "",
    },
  };
};
