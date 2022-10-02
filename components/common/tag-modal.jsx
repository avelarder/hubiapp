import React, { useEffect, useRef } from "react";
import ModalContainer from "./modal";
import Multiselect from "./multiselect";

function TagModal({ tags, onConfirm, onCancel }) {
  const defaultButton = useRef(null);

  useEffect(() => {
    defaultButton.current.focus();
  }, []);

  const options = [
    { text: "Tag1", value: "tag1" },
    { text: "Tag2", value: "tag2" },
    { text: "Tag3", value: "tag3" },
    { text: "Tag4", value: "tag4" },
    { text: "Tag5", value: "tag5" },
    { text: "Tag6", value: "tag6" },
    { text: "Tag7", value: "tag7" },
    { text: "Tag8", value: "tag8" },
  ];
  const selectedOptions = ["Tag1", "Tag2"];
  return (
    <ModalContainer onCancel={onCancel}>
      <div className="flex flex-col items-center justify-center">
        <span className="font-semibold">{"Etiquetas"}</span>
        <span className="text-sm">
          <Multiselect
            dropdownHeight={"200px"}
            options={options}
            selectedOptions={selectedOptions}
            onSelectionChange={(e) => {}}
          ></Multiselect>
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
