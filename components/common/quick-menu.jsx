import React from "react";
import QuickLink from "./quick-link";

function QuickMenu({ options, title }) {
  return (
    <div className="flex flex-col justify-center">
      <div className="">
        <h3 className="font-bold text-center">{title}</h3>
      </div>
      <div className="bg-white shadow-xl rounded-lg text-sm">
        <ul className="divide-y divide-gray-300">
          {options.map((x) => (
            <QuickLink key={x.key} href={x.target}>
              {x.label}
            </QuickLink>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default QuickMenu;
