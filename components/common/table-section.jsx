import { NavLink } from "../navLink";
import React, { useState } from "react";
import ContextualMenu from "../dashboard/contextualMenu";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import Select from "./select";
import moment from "moment";
import { isObject } from "../../utils/utilities";

function TableSection({
  sectionTitle,
  currentLimit,
  isOrderDesc,
  orderField,
  dataset,
  filterPost,
  onView,
  onEdit,
  onDelete,
  onShowMore,
  onChangeLimit,
  onOrderByFieldChanged,
  onFilterPostChanged,
  onRowIsClicked,
  filteringOptions,
}) {
  const limitOptions = [
    { id: 5, text: "  5" },
    { id: 10, text: " 10" },
    { id: 20, text: " 20" },
    { id: 50, text: " 50" },
    { id: 100, text: "100" },
  ];

  const handleSortAndFilter = () => {
    const header = dataset.headers.find((x) => x.source === orderField);
    if (!header) header = dataset.headers[0];

    dataset.data = dataset.data
      .filter(
        (post) =>
          filterPost === "" ||
          post.title.toLowerCase().includes(filterPost.toLowerCase()) ||
          post.publishedOn.toLowerCase().includes(filterPost.toLowerCase()) ||
          post.expiresBy.toLowerCase().includes(filterPost.toLowerCase())
      )
      .sort((a, b) => {
        if (header.isDate) {
          let fa = isOrderDesc
              ? a[orderField]
                ? moment(a[orderField], header.format).format("YYYY-MM-DD")
                : "--"
              : b[orderField]
              ? moment(b[orderField], header.format).format("YYYY-MM-DD")
              : "--",
            fb = isOrderDesc
              ? b[orderField]
                ? moment(b[orderField], header.format).format("YYYY-MM-DD")
                : "--"
              : a[orderField]
              ? moment(a[orderField], header.format).format("YYYY-MM-DD")
              : "--";

          return fa > fb ? 1 : fa < fb ? -1 : 0;
        } else {
          let fa = isOrderDesc
              ? a[orderField].toLowerCase()
              : b[orderField].toLowerCase(),
            fb = isOrderDesc
              ? b[orderField].toLowerCase()
              : a[orderField].toLowerCase();

          return fa > fb ? 1 : fa < fb ? -1 : 0;
        }
      })
      .map((x) => x);
  };

  handleSortAndFilter(orderField, filterPost);

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="flex px-5 py-4 border-b border-gray-100 justify-end items-center">
        <h2 className="flex font-semibold text-gray-800 w-full">
          {sectionTitle}
        </h2>

        {filteringOptions ?? (
          <input
            type={"text"}
            className="flex text-sm text-gray-500 w-full h-8 border-gray-200 rounded-lg border-1 mx-4"
            aria-multiline={true}
            placeholder="Para realizar una búsqueda, ingrese el contenido a buscar..."
            value={filterPost}
            onChange={(e) => {
              onFilterPostChanged(e.currentTarget.value);
            }}
          ></input>
        )}
      </header>
      <div className="p-3 flex">
        {/* Table */}
        <div className="w-full">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                {dataset.headers.map((header) => (
                  <th key={header.source} className="whitespace-nowrap ">
                    <div
                      className="p-2 flex font-semibold text-left cursor-pointer items-center hover:bg-purple-100 h-full"
                      onClick={() => onOrderByFieldChanged(header.source)}
                    >
                      <span
                        className={
                          header.source === orderField
                            ? "text-purple-400 font-extrabold"
                            : "text-black"
                        }
                      >
                        {header.columnName}
                      </span>
                      {header.source === orderField && (
                        <>
                          {isOrderDesc ? (
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
                  <tr key={row.id} className="hover:bg-gray-50">
                    {dataset.headers.map((header) => (
                      <td key={header.source} className="p-2">
                        <div className="flex items-center">
                          <div className="font-medium text-gray-800">
                            {header.isLink ? (
                              <NavLink
                                className={`block underline
                                 text-purple-600 hover:text-purple-400 transition duration-150 hover:text-gray-200"}`}
                                href={header.path(row["id"])}
                              >
                                {row[header.source]}
                              </NavLink>
                            ) : isObject(row[header.source]) ? (
                              row[header.source].text
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
          <div className="flex justify-center w-full my-2">
            <div className="w-32">
              <Select
                title={"Cantidad de registros por página"}
                showTitle={false}
                options={limitOptions}
                selectedOption={limitOptions.find((x) => x.id === currentLimit)}
                onOptionChanged={(option) => onChangeLimit(option.id)}
              ></Select>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <button
              className="bg-gray-50  shadow-md h-8 rounded-full w-40  text-black text-xs font-medium "
              onClick={onShowMore}
            >
              Mostrar más
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableSection;
