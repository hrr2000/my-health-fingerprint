import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Montserrat } from "@next/font/google";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import ProgressBar from "@badrap/bar-of-progress";
import {Router} from "next/router";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-mont",
});

const progress = new ProgressBar({
  size: 3,
  color: "white",
  className: "progress-bar",
  delay: 100,
});
try {
  Router.events.on("routeChangeStart", () => {
    progress.start();
  });
  Router.events.on("routeChangeComplete", () => {
    progress.finish();
  });
  Router.events.on("routeChangeError", () => {
    progress.finish();
  });
} catch (err) {
  console.error(err);
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component className={`${montserrat.variable}`} {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
