import React from "react";
import Link from "next/link";
import { Children } from "react";

function QuickLink({href, ...props}) {
  return (
    <li className="p-4 hover:bg-gray-50 cursor-pointer">
      <Link href={href}>{props.children}</Link>
    </li>
  );
}

export default QuickLink;
