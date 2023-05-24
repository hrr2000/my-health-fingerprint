import { type NextPage } from "next";
import Head from "next/head";
import SigninForm from "@/components/form/SigninForm";
type SignInPageType = NextPage;

const SigninPage: SignInPageType = () => {
  return (
    <>
      <Head key="adasdd">
        <title>Sign In</title>
        <meta name="description" content="sign in page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid min-h-screen lg:grid-cols-1">
        <div className="col-span-1 col-start-1 flex flex-col items-center justify-center gap-5 p-6">
          <SigninForm />
        </div>
      </main>
    </>
  );
};

export default SigninPage;
