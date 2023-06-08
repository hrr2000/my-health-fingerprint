import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserModel } from "./models";
import { dbConnect } from "@/server/db";

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
        console.log(selectedOrg);
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
