import React, { useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import { XCircleIcon } from "@heroicons/react/solid";
import FieldContainer from "../common/field-container";
import TextInput from "../common/textInput";
import {
  StateStyledButton,
  StyledSecondaryButton,
} from "../admin/base-ui-components";
import { VALIDATIONS } from "../../utils/UI-Constants";
import { useAuth } from "../../authUserProvider";

function IncidentReturnedModal({ onConfirm, onCancel }) {
  const [comments, setComments] = useState("");
  const [hasComments, setHasComments] = useState(false);
  const { authUser } = useAuth();

  return (
    <div
      onKeyDownCapture={(e) => {
        if (e.key === "Escape") onCancel();
      }}
    >
      <div
        className="fixed z-100 inset-0 overflow-y-auto"
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

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-center">
                <div className="mt-3 text-center sm:mt-0  sm:text-left w-full">
                  <div className="flex w-full">
                    <div className="flex flex-1 justify-center">
                      <h3
                        className="text-2xl leading-6 font-bold text-gray-900 text-center my-3"
                        id="modal-title"
                      >
                        Devolución a Inicidencia
                      </h3>
                    </div>
                    <div className="flex ">
                      <XCircleIcon
                        className="w-8 h-8 cursor-pointer"
                        onClick={onCancel}
                      ></XCircleIcon>
                    </div>
                  </div>
                  <div>
                    <FieldContainer>
                      <TextInput
                        rows={5}
                        minRows={3}
                        maxRows={10}
                        placeholder="Ingrese las acciones a tomar"
                        value={comments}
                        invalidText="Ingrese las acciones a tomar"
                        onChange={(e) => {
                          setComments(e);
                          setHasComments(e.length > 0);
                        }}
                        validation={VALIDATIONS.NONE}
                      ></TextInput>
                    </FieldContainer>
                    <div className="flex justify-end text-white text-md font-bold  mt-8 ">
                      <StyledSecondaryButton
                        className="w-32 bg-gray-400  h-300 shadow-md rounded-md mr-5"
                        onClick={onCancel}
                      >
                        Cerrar
                      </StyledSecondaryButton>
                      <StateStyledButton
                        disabled={!hasComments}
                        onClick={() => {
                          hasComments &&
                            onConfirm({
                              comment: comments,
                              authorId: authUser.email,
                              authorEmail: authUser.email,
                              postedOn: new Date().toISOString(),
                            });
                        }}
                      >
                        Confirmar devolución
                      </StateStyledButton>
                    </div>
                  </div>
                  <div className="h-6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncidentReturnedModal;
