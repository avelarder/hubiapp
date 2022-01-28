import { NavLink } from "../navLink";
import React, { useState } from "react";
import ContextualMenu from "../dashboard/contextualMenu";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import TextInput from "./textInput";
import Select from "./select";

function TableSection({
  sectionTitle,
  rowsPerPage,
  dataset,
  onView,
  onEdit,
  onDelete,
  onShowMore,
  onChangeLimit
}) {

  const limitOptions = [
    { id: "5", text: "  5" },
    { id: "10", text: " 10" },
    { id: "20", text: " 20" },
    { id: "50", text: " 50" },
    { id: "100", text: "100" }
  ];

  const [filteredDataSet, setFilteredDataSet] = useState(dataset.data);
  const [isOrderDirectionDesc, setOrderDirection] = useState(false);
  const [orderField, setOrderField] = useState("publishedOn");
  const [filterPost, setFilterPost] = useState("")

  const handleOrderByFieldChanged = (field) => {
    let localDirection;
    if (field === orderField) localDirection = (!isOrderDirectionDesc);
    else {
      setOrderField(field);
      localDirection = (false);
    }

    filteredDataSet
      .sort((a, b) => {
        let fa = isOrderDirectionDesc ? a[field].toLowerCase() : b[field].toLowerCase(),
          fb = isOrderDirectionDesc ? b[field].toLowerCase() : a[field].toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      })


    setOrderDirection(localDirection);
  };

  const handleOnFilterChanged = (value) => {

    if (!value) {
      setFilteredDataSet(dataset.data);
    } else {
      setFilteredDataSet(
        dataset.data.filter(post => post.title.toLowerCase().includes(value.toLowerCase()) ||
          post.publishedOn.toLowerCase().includes(value.toLowerCase()) ||
          post.expiresBy.toLowerCase().includes(value.toLowerCase())));
    }
    setFilterPost(value);
  }

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="flex px-5 py-4 border-b border-gray-100 justify-end items-center">
        <h2 className="flex font-semibold text-gray-800 w-full">{sectionTitle}</h2>
        <TextInput
          className="flex text-sm text-gray-500 w-full h-8 border-gray-200 rounded-lg border-2 mx-4"
          aria-multiline={true}
          multiple={true}
          placeholder="Para realizar una búsqueda, ingrese el contenido a buscar..."
          value={filterPost}
          onChange={handleOnFilterChanged}
        ></TextInput>

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
                      onClick={() => handleOrderByFieldChanged(header.source)}
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
                          {isOrderDirectionDesc ? (
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
              {filteredDataSet.map((row) => {
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
          <div className="flex justify-center w-full my-2">
            <div className="w-32">
              <Select
                title={"Cantidad de registros por página"}
                showTitle={false}
                options={limitOptions}
                selectedOption={
                  limitOptions.find(
                    (x) =>
                      x.id ==
                      rowsPerPage
                  )
                }
                onOptionChanged={(option) => onChangeLimit(option.id)}
              ></Select>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <button
              className="bg-white  shadow-md h-8 rounded-full w-40  text-black text-xs font-medium "
              onClick={onShowMore}
            >
              Mostrar más
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}

export default TableSection;

