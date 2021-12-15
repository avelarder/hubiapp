import { DotsVerticalIcon } from "@heroicons/react/outline";
import { NavLink } from "../navLink";
import React from "react";

function TableSection({ sectionTitle, dataset }) {
  return (
    <div className="flex flex-col bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="flex px-5 py-4 border-b border-gray-100">
        <h2 className="flex font-semibold text-gray-800">{sectionTitle}</h2>
        <div className="flex items-end text-xs">
          <DotsVerticalIcon></DotsVerticalIcon>
        </div>
      </header>
      <div className="p-3 flex">
        {/* Table */}
        <div className="w-full">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                {dataset.headers.map((header) => (
                  <th key={header.source} className="p-2 whitespace-nowrap ">
                    <div className="font-semibold text-left">
                      {header.columnName}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100">
              {dataset.data.map((row) => {
                return (
                  <tr key={row.id}>
                    {dataset.headers.map((header) => (
                      <td key={header.source} className="p-2">
                        <div className="flex items-center">
                          <div className="font-medium text-gray-800">
                            {header.isLink ? (
                              <NavLink
                                className={`block underline
                                 text-purple-600 hover:text-purple-400 transition duration-150 hover:text-gray-200"}`}
                                href={header.path + row["id"]}
                              >
                                {row[header.source]}
                              </NavLink>
                            ) : (
                              row[header.source]
                            )}
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TableSection;
