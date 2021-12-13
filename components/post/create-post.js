import React, { useState } from "react";
import classNames from "classnames";
import TextareaAutosize from "react-textarea-autosize";
import Select from "../common/select";
import {
  LinkIcon,
  PaperClipIcon,
  PhotographIcon,
  VideoCameraIcon,
} from "@heroicons/react/solid";

function PostIndicator({ currentStep, totalSteps }) {
  const items = [];

  for (let index = 0; index < totalSteps; index++) {
    items[index] = 1;
  }

  return (
    <div className="flex justify-evenly flex-wrap w-full mb-4">
      {items.map((_, i) => (
        <div
          className={classNames(
            "h-2 flex-grow mr-1 rounded-md ",
            i + 1 === currentStep ? `bg-purple-400` : `bg-gray-400`
          )}
          key={i}
        ></div>
      ))}
    </div>
  );
}

function PostTile({ title, type, onClick }) {
  return (
    <button
      className="mt-2 border-2 rounded-md border-purple-600 bg-purple-700 text-white w-40 h-40 text-lg font-medium"
      onClick={() => onClick(type)}
    >
      {title}
    </button>
  );
}

function PostTypeScreen({
  postOptions,
  onCurrentStepChange,
  onCurrentOptionChange,
}) {
  const handleCurrentOptionChange = (type) => {
    onCurrentOptionChange(type);
    onCurrentStepChange(2);
  };

  return (
    <div className="flex justify-evenly flex-wrap w-full">
      <PostTile
        title={"Aviso"}
        type={postOptions.find((x) => x.key === "news")}
        onClick={handleCurrentOptionChange}
      ></PostTile>
      <PostTile
        title={"Compra Venta"}
        type={postOptions.find((x) => x.key === "marketplace")}
        onClick={handleCurrentOptionChange}
      ></PostTile>
      <PostTile
        title={"Encuestas"}
        type={postOptions.find((x) => x.key === "survey")}
        onClick={handleCurrentOptionChange}
      ></PostTile>
      <PostTile
        title={"Alquiler"}
        type={postOptions.find((x) => x.key === "rent")}
        onClick={handleCurrentOptionChange}
      ></PostTile>
      <PostTile
        title={"Informes"}
        type={postOptions.find((x) => x.key === "reports")}
        onClick={handleCurrentOptionChange}
      ></PostTile>
    </div>
  );
}

function CreatePost({
  step,
  onStepChanged,
  option,
  onOptionChanged,
  postOptions,
  postScopeOptions,
  onCancel,
  onConfirm,
  onPreview,
}) {
  const [postData, setPostData] = useState({
    option: option,
    step: step,
    data: [],
  });

  const [postAttributes, setPostAttributes] = useState([]);

  const handleScopeChange = (newScope) => {
    setPostAttributes([...postAttributes, { key: "scope", value: newScope }]);
  };
  const handleDescriptionChange = (description) => {
    setPostAttributes([
      ...postAttributes,
      {
        key: "description",
        value: description,
      },
    ]);
  };

  const handlePostDataChange = () => {
    let latestPostData = { ...postData, data: postAttributes };
    setPostData(latestPostData);

    onPreview(latestPostData);
  };

  console.log(postData);
  return (
    <div
      onKeyDownCapture={(e) => {
        if (e.key === "Escape") onCancel();
      }}
    >
      <div
        className="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-center">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900 text-center mb-4"
                    id="modal-title"
                  >
                    Crear Publicación
                  </h3>
                  <PostIndicator
                    currentStep={step}
                    totalSteps={option ? option.steps : 0}
                  ></PostIndicator>
                  {/* Step Container */}
                  {step === 1 && (
                    <PostTypeScreen
                      postOptions={postOptions}
                      onCurrentStepChange={onStepChanged}
                      onCurrentOptionChange={onOptionChanged}
                    ></PostTypeScreen>
                  )}
                  {step === 2 && (
                    <div>
                      <div className="mt-2 ">
                        <Select
                          title={"Tu aviso será visible a:"}
                          showTitle={true}
                          options={postScopeOptions}
                          selectedOption={
                            postScopeOptions.find(
                              (x) =>
                                x.id ===
                                postAttributes.find((x) => x.key === "scope")
                                  ?.value
                            ) ?? postScopeOptions[0]
                          }
                          onOptionChanged={handleScopeChange}
                        ></Select>
                      </div>
                      <div className="mt-2 ">
                        <span className="block text-sm font-medium text-gray-700">
                          Descripción
                        </span>
                        <TextareaAutosize
                          className="text-sm text-gray-500 w-full h-40 border-gray-200 rounded-lg p-2 border-2"
                          aria-multiline={true}
                          multiple={true}
                          placeholder="Ingresa la descripción de tu aviso aquí."
                          value={
                            postAttributes.find((x) => x.key === "description")
                              ?.value
                          }
                          onBlur={(e) =>
                            handleDescriptionChange(e.currentTarget.value)
                          }
                        ></TextareaAutosize>
                      </div>
                      <div className="mt-2 flex flex-row-reverse">
                        <PhotographIcon className="flex text-purple-600 w-6 h-5 border-2 border-purple-50 m-1 rounded-sm cursor-pointer"></PhotographIcon>
                        <VideoCameraIcon className="flex text-purple-600 w-6 h-5 border-2 border-purple-50 m-1  rounded-sm cursor-pointer"></VideoCameraIcon>
                        <PaperClipIcon className="flex text-purple-600 w-6 h-5 border-2 border-purple-50 m-1  rounded-sm cursor-pointer"></PaperClipIcon>
                        <LinkIcon className="flex text-purple-600 w-6 h-5 border-2 border-purple-50 m-1  rounded-sm cursor-pointer"></LinkIcon>
                      </div>
                    </div>
                  )}
                  {step === option?.steps && (
                    <div>
                      <div className="mt-2 ">
                        <span className="block text-xs font-medium text-gray-700">
                          Descripción
                        </span>
                        <div className="text-sm text-gray-500 w-full h-40 border-gray-50 rounded-lg p-2 border-2">
                          {
                            postData.data.find((x) => x.key === "description")
                              .value
                          }
                        </div>
                      </div>
                      <div className="mt-2 ">
                        <span className="text-xs">
                          Visible a:
                          <b>
                            {
                              postData.data.find((x) => x.key === "scope").value
                                .text
                            }
                          </b>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              {option?.steps === step && (
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => onConfirm(postData)}
                  autoFocus
                >
                  Publicar
                </button>
              )}

              {option?.steps - 1 === step && (
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handlePostDataChange()}
                  autoFocus
                >
                  Previsualizar
                </button>
              )}
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => onCancel()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
