import React, { useEffect, useRef } from "react";
import { useState } from "react";
import ModalContainer from "./modal";
import Multiselect from "./multiselect";

function TagModal({ tags, onConfirm, onCancel }) {
  const defaultButton = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([
    { text: "Tag1", value: "tag1" },
    { text: "Tag2", value: "tag2" },
    { text: "Tag3", value: "tag3" },
    { text: "Tag4", value: "tag4" },
    { text: "Tag5", value: "tag5" },
    { text: "Tag6", value: "tag6" },
    { text: "Tag7", value: "tag7" },
    { text: "Tag8", value: "tag8" },
  ]);
  useEffect(() => {
    defaultButton.current.focus();
  }, []);

  const handleAddNewOption = (e) => {
    if (e.target.value && e.target.value.length > 0) {
      const option = e.target.value;
      setSelectedOptions((prev) => [...prev, option]);
      e.target.value = "";
    }
  };

  console.log("New label", selectedOptions);

  return (
    <ModalContainer onCancel={onCancel}>
      <div className="flex flex-col items-center justify-center">
        <span className="font-semibold">{"Etiquetas"}</span>
        <span className="text-sm w-full h-64">
          <Multiselect
            dropdownHeight={"200px"}
            options={options}
            selectedOptions={selectedOptions}
            onSelectionChange={(e) => {
              setSelectedOptions(e);
            }}
          ></Multiselect>
          <div>
            <span>
              No encuentras lo que buscas? Ingresa una nueva etiqueta aquí.
            </span>
            <input
              className="border-1 h-10 rounded-lg w-full"
              onBlur={handleAddNewOption}
            ></input>
          </div>
        </span>
        <div className="flex mt-4 flex-row-reverse">
          <button
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-300 text-base font-medium text-white hover:bg-red-700  sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onConfirm}
          >
            Aceptar
          </button>
          <button
            ref={defaultButton}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700  sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </ModalContainer>
  );
}

export default TagModal;
