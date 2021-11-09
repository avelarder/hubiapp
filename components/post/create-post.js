import React, { useState } from "react";
import classNames from "classnames";
const postOptions = {
  NEWS: "news",
  MARKETPLACE: "marketplace",
  SURVEY: "survey",
  RENT: "rent",
  REPORT: "report",
};

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

function PostTypeScreen({ onCurrentStepChange, onCurrentOptionChange }) {
  const handleCurrentOptionChange = (type) => {
    onCurrentOptionChange(type);
    onCurrentStepChange(2);
  };

  return (
    <div className="flex justify-evenly flex-wrap w-full">
      <PostTile
        title={"Aviso"}
        type={postOptions.NEWS}
        onClick={handleCurrentOptionChange}
      ></PostTile>
      <PostTile
        title={"Compra Venta"}
        type={postOptions.MARKETPLACE}
        onClick={handleCurrentOptionChange}
      ></PostTile>
      <PostTile
        title={"Encuestas"}
        type={postOptions.SURVEY}
        onClick={handleCurrentOptionChange}
      ></PostTile>
      <PostTile
        title={"Alquiler"}
        type={postOptions.RENT}
        onClick={handleCurrentOptionChange}
      ></PostTile>
      <PostTile
        title={"Informes"}
        type={postOptions.REPORT}
        onClick={handleCurrentOptionChange}
      ></PostTile>
    </div>
  );
}

function CreatePost({ onCancel, onConfirm }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentOption, setCurrentOption] = useState("");

  const handleCurrentStepChange = (step) => {
    setCurrentStep(step);
  };

  const handleCurrentOptionChange = (type) => {
    setCurrentOption(type);
  };

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
                    currentStep={currentStep}
                    totalSteps={10}
                  ></PostIndicator>
                  {/* Step Container */}
                  {currentStep === 1 && (
                    <PostTypeScreen
                      onCurrentStepChange={handleCurrentStepChange}
                      onCurrentOptionChange={handleCurrentOptionChange}
                    ></PostTypeScreen>
                  )}
                  {currentStep === 2 && (
                    <div>
                      <div className="mt-2 ">
                        <button>La Floresta / Vecinos / Publico</button>
                      </div>
                      <div className="mt-2 ">
                        <button>Aviso / Compra-Venta / Encuesta</button>
                      </div>
                      <div className="mt-2 ">
                        <textArea
                          className="text-sm text-gray-500 w-full h-40 border-gray-200 rounded-lg p-2 border-2"
                          aria-multiline={true}
                          multiple={true}
                          value={
                            "Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone."
                          }
                        ></textArea>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => onConfirm()}
                autoFocus
              >
                Publicar
              </button>
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
