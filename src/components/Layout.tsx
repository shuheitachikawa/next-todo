import React from "react";
import type { ReactNode, FC } from "react";
import Link from "next/link";

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = (props) => {
  return (
    <div className="">
      <header>
        <Link href={"/"}>
          <h1 className="text-lg px-4 py-5 inline-block cursor-pointer">MyApp</h1>
        </Link>
      </header>
      <div className="px-4 max-w-sm">{props.children}</div>
    </div>
  );
};
