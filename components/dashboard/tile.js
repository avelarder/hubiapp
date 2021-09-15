import React from "react";
import Image from "next/image";
import Link from "next/link";
import ContextualMenu from "./contextualMenu";
import LineChart01 from "../../charts/LineChart01";

function Tile({ title, value, variant }) {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <Image src="/hubi-logo.jpg" width="32" height="32" alt="Icon 01" />
          {/* Menu button */}
          <ContextualMenu className="relative inline-flex">
            <li>
              <Link
                className="font-medium text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                href="#0"
              >
                Option 1
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                href="#0"
              >
                Option 2
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3"
                href="#0"
              >
                Remove
              </Link>
            </li>
          </ContextualMenu>
        </header>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
        <div className="text-xs font-semibold text-gray-400 uppercase mb-1">
          Ocupación
        </div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 mr-2">{value}</div>
          <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">
            {variant}
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="flex-grow">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart01 data={[10, 20, 15, 12, 22]} width={200} height={60} />
      </div>
    </div>
  );
}

export default Tile;
