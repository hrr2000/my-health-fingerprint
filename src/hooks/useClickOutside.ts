import { useEffect, useRef } from "react";

export default function useOnClickOutside(cb: () => void) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const listener = (event: Event) => {
      if (
        ref.current &&
        ref.current !== event.target &&
        !ref.current.contains(event.target as Node)
      ) {
        cb();
      }
    };
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, []);
  return ref;
}
