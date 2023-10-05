
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Tajawal } from "@next/font/google";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/router";
import { AnimatePresence } from "framer-motion";
import { PatientProvider } from "@/contexts/PatientContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { appWithTranslation, useTranslation } from "next-i18next";
import nextI18nConfig from "@/../next-i18next.config.mjs";
import { getDirection, isRTL } from "@/utils/helpers";

const tajawal = Tajawal({
  subsets: ["latin"],
  weight: ["200", "300", "400", "700", "900"],
  variable: "--font-tajawal",
});

const progress = new ProgressBar({
  size: 3,
  color: "blue",
  className: "progress-bar",
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
  const {i18n} = useTranslation()

  return (
    <AnimatePresence initial={true}>
      <SessionProvider session={session}>
        <PatientProvider>
          <main dir={getDirection(isRTL(i18n.language))} className={`${tajawal.variable} font-tajawal`}>
            <Component {...pageProps} />
            <ToastContainer />
          </main>
          {/* <ReactQueryDevtools /> */}
        </PatientProvider>
      </SessionProvider>
    </AnimatePresence>
  );
};

const I18nApp = appWithTranslation(MyApp, nextI18nConfig);
export default  api.withTRPC(I18nApp);