import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserModel } from "./models";
import { dbConnect } from "@/server/db";
import { type ObjectId } from "mongoose";
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
      roles: ObjectId[];
      orgId: string;
      orgName: string;
      jobTitle: string;
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    roles: ObjectId[];
    first_name: string;
    last_name: string;
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
    roles: ObjectId[];
    orgId: string;
    orgName: string;
    jobTitle: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.picture = user.picture;
        token.sub = user.nationalId;
        token.name = user.first_name + " " + user.last_name;
        token.orgName = user.orgName;
        token.orgId = user.orgId;
        token.roles = user.roles;
        token.jobTitle = user.jobTitle;
      }

      return token;
    },
    session({ session, token }) {
      //console.log("SESSION", { session, token });
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.orgId = token.orgId;
        session.user.roles = token.roles;
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
        console.log("ORG CREDENTIALS", creds);
        const user = await UserModel.findOne({
          nationalId: creds?.nationalId,
          organizations: {
            $elemMatch: { org_id: creds?.org_id, password: creds?.password },
          },
        });
        console.log("USER", user);
        if (user) {
          const { first_name, last_name, organizations } = user;
          const selectedOrg = organizations.find(
            (org) => org.org_id.toString() === creds?.org_id
          );
          console.log("SELECTED ORG", selectedOrg);
          if (selectedOrg) {
            const { org_name, org_id, email, picture, jobTitle, roles } =
              selectedOrg;
            return {
              first_name,
              last_name,
              org_name,
              email,
              picture,
              jobTitle,
              org_id,
              roles,
              nationalId: creds?.nationalId,
            };
          }
          return null;
        }
        return null;
      },
      credentials: {
        org_id: {},
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
