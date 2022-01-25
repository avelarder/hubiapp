import { DotsVerticalIcon } from "@heroicons/react/outline";
import { NavLink } from "../navLink";
import React from "react";
import ContextualMenu from "../dashboard/contextualMenu";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";

function TableSection({
  sectionTitle,
  rowsPerPage,
  orderBy,
  orderDirectionDesc,
  dataset,
  onView,
  onEdit,
  onDelete,
  onShowMore,
  onFieldOrderChanged,
}) {
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
                    <div
                      className="flex font-semibold text-left cursor-pointer items-center"
                      onClick={() => onFieldOrderChanged(header.source)}
                    >
                      <span
                        className={
                          header.source === orderBy
                            ? "text-purple-400 font-extrabold"
                            : "text-black"
                        }
                      >
                        {header.columnName}
                      </span>
                      {header.source === orderBy && (
                        <>
                          {orderDirectionDesc ? (
                            <ChevronDownIcon className="text-purple-400 w-4 h-4"></ChevronDownIcon>
                          ) : (
                            <ChevronUpIcon className="text-purple-400 w-4 h-4"></ChevronUpIcon>
                          )}
                        </>
                      )}
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
                    <td className="w-5">
                      <ContextualMenu
                        key={row.id}
                        className="relative inline-flex"
                      >
                        <li>
                          <button
                            className="w-full p-2 text-base text-purple-800 hover:text-purple-600 hover:bg-gray-100"
                            onClick={() => {
                              onView(row["id"]);
                            }}
                          >
                            Ver
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full p-2 text-base text-purple-800 hover:text-purple-600 hover:bg-gray-100"
                            onClick={() => {
                              onEdit(row["id"]);
                            }}
                          >
                            Editar
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full p-2 text-base text-red-800 hover:text-red-600 hover:bg-gray-100"
                            onClick={(e) => {
                              onDelete(row["id"]);
                              e.currentTarget.blur();
                            }}
                          >
                            Eliminar
                          </button>
                        </li>
                      </ContextualMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-center w-full">
            <button
              className="bg-white  shadow-md h-8 rounded-full w-40  text-black text-xs font-medium "
              onClick={onShowMore}
            >
              Show more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableSection;
