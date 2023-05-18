import Link from "next/link";
import React from "react";

export default function CompanyLogo() {
  return (
    <Link href="/">
      <h2 className="mb-[.2rem] bg-gradient-to-r from-[#f75e8e] to-[#fc737c] bg-clip-text text-left text-6xl font-semibold leading-none text-transparent  ">
        MHFP
      </h2>
    </Link>
  );
}
