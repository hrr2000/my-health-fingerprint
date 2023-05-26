import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Tajawal } from "@next/font/google";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/router";
import { AnimatePresence } from "framer-motion";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PatientProvider } from "@/contexts/PatientContext";

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
  return (
    <AnimatePresence initial={true}>
      <SessionProvider session={session}>
        <PatientProvider>
          <main className={`${tajawal.variable} font-tajawal `}>
            <Component {...pageProps} />
          </main>
          {/* <ReactQueryDevtools /> */}
        </PatientProvider>
      </SessionProvider>
    </AnimatePresence>
  );
};

export default api.withTRPC(MyApp);
