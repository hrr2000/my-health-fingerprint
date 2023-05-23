import React from "react";
import { motion } from "framer-motion";

type columnsLength1 = {
  cols: "1";
  children: React.ReactNode;
};
type columnsLength2 = {
  cols: "2";
  children: [React.ReactNode, React.ReactNode];
};

type possibleColumnLayouts = columnsLength1 | columnsLength2;
const MainLayout = ({ cols, children }: possibleColumnLayouts) => {
  return (
    <motion.main
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className="grid gap-3 md:grid-cols-2"
    >
      {children}
    </motion.main>
  );
};

MainLayout.columnOne = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`col-start-1 col-end-2 ${className ? className : ""} `}>
    {children}
  </div>
);

MainLayout.columnTwo = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`col-start-2 col-end-3 ${className ? className : ""}`}>
    {children}
  </div>
);
export default MainLayout;
