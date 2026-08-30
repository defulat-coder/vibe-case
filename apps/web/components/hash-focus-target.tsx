"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";

type HashFocusTargetProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  id: string;
};

export function HashFocusTarget({ children, id, ...props }: HashFocusTargetProps) {
  const target = useRef<HTMLElement>(null);

  useEffect(() => {
    function focusTarget() {
      if (window.location.hash !== `#${id}`) return;
      window.requestAnimationFrame(() => target.current?.focus({ preventScroll: true }));
    }

    focusTarget();
    window.addEventListener("hashchange", focusTarget);
    return () => window.removeEventListener("hashchange", focusTarget);
  }, [id]);

  return <section {...props} ref={target} id={id} tabIndex={-1}>{children}</section>;
}
