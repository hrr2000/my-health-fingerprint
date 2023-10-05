import Link from "next/link";
import { useRouter } from "next/router";
import { type GenericProps, type ILink } from "@/types/application";
import Image from "next/image";
import { useTranslation } from "next-i18next";
interface LocalProps extends GenericProps {
  links: ILink[];
  activeLinkClassName: string;
  linkClassName: string;
  className: string;
}

export function NavLinks({
  links,
  activeLinkClassName,
  linkClassName,
  className,
}: LocalProps) {
  const router = useRouter();
  const {t} = useTranslation("common")

  return (
    <ul className={`${className}`}>
      {links.map(({ href, image, display_text }) => (
        <li
          key={href}
          className={` ${linkClassName} ${
            router.asPath.includes("/" + href) ? activeLinkClassName : ""
          }`}
        >
          <Link className="flex w-full items-center gap-2" href={`/${href}`}>
            {typeof image === "string" ? (
              <Image src={image} alt="" width={20} height={20} />
            ) : (
              image
            )}
            {t(display_text)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
