import React, { useEffect, useRef } from "react";
import { useState } from "react";
import ModalContainer from "./modal";
import Multiselect from "./multiselect";

function TagModal({ tags, onConfirm, onCancel }) {
  const defaultButton = useRef(null);
  const [inputText, setInputText] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState(
    [
      { text: "demo", value: "demo", isSelected: false },
      { text: "task", value: "task", isSelected: false },
      { text: "risk", value: "risk", isSelected: false },
      { text: "tarro", value: "tarro", isSelected: false },
      { text: "cargo", value: "cargo", isSelected: false },
      { text: "medico", value: "medico", isSelected: false },
      { text: "seguridad", value: "seguridad", isSelected: false },
      { text: "guia", value: "guia", isSelected: false },
    ].sort((x, y) => (x.value > y.value ? 1 : -1))
  );

  useEffect(() => {
    defaultButton.current.focus();
  }, []);

  const handleAddNewOption = (e) => {
    if (e.keyCode === 13) {
      //   const option = e.target.value;
      //   setOptions((prev) => [...prev, { text: option, value: option }]);
      //   setSelectedOptions((prev) => [...prev, option]);
      //   e.target.value = "";
    }
  };

  const handleInputTyping = (e) => {
    setInputText(e.currentTarget.value);
  };

  const handleSelection = (e) => {
    const selectedTag = e.currentTarget.value;
    const isSelected = e.currentTarget.checked;

    const localOptions = options.filter((x) => x.value !== selectedTag);

    setOptions(
      [
        ...localOptions,
        { text: selectedTag, value: selectedTag, isSelected: isSelected },
      ].sort((x, y) => (x.value > y.value ? 1 : -1))
    );
  };

  return (
    <ModalContainer onCancel={onCancel}>
      <div className="flex flex-col items-center justify-center">
        <span className="font-semibold">{"Etiquetas"}</span>
        <div className="text-sm w-full h-64">
          <div>
            <input
              className="border-1 h-10 rounded-lg w-full p-4"
              onKeyDown={handleAddNewOption}
              onChange={handleInputTyping}
            ></input>
          </div>
          <div className="flex flex-col overflow-y-scroll h-40">
            {options
              .filter((x) => x.text.includes(inputText))
              .map((x, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    value={x.value}
                    checked={x.isSelected}
                    onChange={handleSelection}
                  ></input>
                  <b>
                    <x>{x.text}</x>
                  </b>
                </div>
              ))}
          </div>
        </div>
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
