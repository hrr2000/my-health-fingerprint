import Link from "next/link";
import { useRouter } from "next/router";
import { type GenericProps, type ILink } from "@/types/application";
import Image from "next/image";
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
  console.log({ router });

  return (
    <ul className={`${className}`}>
      {links.map(({ href, image, display_text }) => (
        <li
          key={href}
          className={` ${linkClassName} ${
            router.asPath.includes("/" + href) ? activeLinkClassName : ""
          }`}
        >
          <Link className="flex w-full items-center gap-4" href={`/${href}`}>
            {typeof image === "string" ? (
              <Image src={image} alt="" width={30} height={30} />
            ) : (
              image
            )}
            {display_text}
          </Link>
        </li>
      ))}
    </ul>
  );
}
