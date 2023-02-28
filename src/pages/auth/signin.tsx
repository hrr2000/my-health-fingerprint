import React from "react";
import { signIn, getCsrfToken } from "next-auth/react";
import Image from "next/image";
import styles from "./signin.module.css";
import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <div className={styles.wrapper} />
      <div className={styles.content}>
        <div className={styles.cardWrapper}>
          <Image
            src="/katalog_full.svg"
            width={190}
            height={64}
            alt="App Logo"
            style={{ height: "85px", marginBottom: "20px" }}
          />
          <form
            action="/api/auth/callback/credentials"
            className={styles.cardContent}
          >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <input placeholder="Email" type="email" size={23} />
            <input placeholder="Password" type="password" size={23} />
            <button className={styles.primaryBtn}>Submit</button>
          </form>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <Image
        src="/login_pattern.svg"
        alt="Pattern Background"
        width={100}
        height={100}
        className={styles.styledPattern}
      />
    </div>
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
