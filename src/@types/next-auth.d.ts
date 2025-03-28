import {
  DefaultSession,
  DefaultUser,
  Profile as DefaultProfile,
} from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      id?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id?: string;
  }

  interface JWT {
    accessToken?: string;
    id?: string;
  }

  interface Profile extends DefaultProfile {
    picture?: string;
  }
}
