import { getCsrfToken } from "next-auth/react";
import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
import Head from "next/head";
import SigninForm from "@/components/form/SigninForm";

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="sign in page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid min-h-screen lg:grid-cols-2">
        <div className=" col-span-1 col-start-1 flex flex-col items-center justify-center gap-5 p-6">
          <SigninForm csrfToken={csrfToken} />
        </div>
        <div
          style={{
            backgroundImage: "url(/reasearch-woman.jpg)",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="col-span-2 col-start-2  hidden items-center justify-center lg:flex "
        ></div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      csrfToken,
    },
  };
}
