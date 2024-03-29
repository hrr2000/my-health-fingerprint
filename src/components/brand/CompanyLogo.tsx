import Link from "next/link";
import React from "react";

export default function CompanyLogo() {
  return (
    <Link href="/" className={`w-fit`}>
      <h2 className="mb-[.2rem] text-primary text-left text-6xl font-black leading-none w-fit">
        MHFP
      </h2>
    </Link>
  );
}
