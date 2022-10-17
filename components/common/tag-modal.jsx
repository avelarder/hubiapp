import React, { useEffect, useRef, useState } from "react";
import ModalContainer from "./modal";
import { useLocationContext } from "../../locationProvider";
import Firebase from "../../firebase";
import useFirestoreQuery from "../../hooks/useFirestoreQuery";
import { uuid } from "uuidv4";

function TagModal({
  selectedTags,
  sourceId,
  onAddingTag,
  onRemovingTag,
  onConfirm,
  onCancel,
}) {
  const db = Firebase.default.firestore();
  const { locationSelected } = useLocationContext();

  const defaultButton = useRef(null);
  const inputTag = useRef(null);
  const [inputText, setInputText] = useState("");
  const [selectedOptions, setSelectedOptions] = useState(selectedTags);
  const [showOptions, setShowOptions] = useState(false);

  const queryTags = db
    .collection("Tags")
    .where("location", "==", locationSelected.id ?? "");

  const {
    data: localTags,
    status: loadingTags,
    error,
  } = useFirestoreQuery(queryTags);

  const removeTag = (e) => {
    setSelectedOptions(selectedOptions.filter((x) => x !== e));
    onRemovingTag(sourceId, e);
  };

  const handleAddNewOption = (e) => {
    if (e.keyCode === 13) {
      const text = inputTag.current.value;

      const newTagId = uuid();
      db.collection("Tags").doc(newTagId).set({
        location: locationSelected.id,
        tag: text,
        createdOnUTC: new Date().toISOString(),
        updatedOnUTC: new Date().toISOString(),
      });
      onAddingTag(sourceId, text);
      setSelectedOptions((prev) => [...prev, text]);
      inputTag.current.value = "";
    }
  };

  const handleInputTyping = (e) => {
    setShowOptions(e.currentTarget.value.length > 0);
    setInputText(e.currentTarget.value);
  };

  const handleSelection = (e) => {
    const selectedTag = e.currentTarget.value;
    const isSelected = e.currentTarget.checked;

    if (isSelected) {
      onAddingTag(sourceId, selectedTag);
      setSelectedOptions((prev) => [...prev, selectedTag]);
    } else {
      onRemovingTag(sourceId, selectedTag);
      setSelectedOptions(selectedOptions.filter((x) => x !== selectedTag));
    }

    setInputText("");
    setShowOptions(false);
    inputTag.current.value = "";
    inputTag.current.focus();
  };

  if (loadingTags === "loading") {
    return (
      <div className="flex justify-center items-center w-full bg-purple-100 h-10 text-xs text-purple-500">
        Los datos se están cargando, un momento por favor.
      </div>
    );
  }

  if (loadingTags === "error") {
    return `Error: ${error.message}`;
  }

  return (
    <ModalContainer onCancel={onCancel}>
      <div className="flex flex-col items-center justify-center">
        <span className="font-semibold">{"Etiquetas"}</span>
        <div className="text-sm w-full h-44 mt-4">
          <div>
            <div className="flex border-1 rounded-lg h-10">
              {selectedOptions.map((tag, index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-indigo-700 bg-indigo-100 border border-indigo-300 "
                >
                  <div className="text-xs font-normal leading-none max-w-full flex-initial">
                    {tag}
                  </div>
                  <div className="flex flex-auto flex-row-reverse">
                    <div onClick={() => removeTag(tag)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-x cursor-pointer hover:text-indigo-400 rounded-full w-4 h-4 ml-2"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
              <input
                ref={inputTag}
                className="rounded-lg w-auto px-4 h-8 outline-none"
                onKeyDown={handleAddNewOption}
                onChange={handleInputTyping}
              ></input>
            </div>
          </div>
          {showOptions && (
            <div className="flex flex-col overflow-y-auto h-28 border-1 rounded-lg mt-4">
              {localTags
                .map((x) => {
                  return {
                    value: x.id,
                    text: x.tag,
                    isSelected: selectedOptions.includes(x.tag),
                  };
                })
                .filter((x) => x.text.includes(inputText))
                .map((x, index) => (
                  <div key={index} className="flexmt-2 ml-2 items-center">
                    <input
                      type="checkbox"
                      value={x.text}
                      checked={x.isSelected}
                      onChange={handleSelection}
                    ></input>
                    <b className="px-4 items-center">{x.text}</b>
                  </div>
                ))}
            </div>
          )}
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
