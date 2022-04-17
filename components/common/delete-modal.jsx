import React, { useEffect, useRef } from "react";
import ModalContainer from "./modal";

function DeleteModal({ onConfirm, onCancel }) {
  const defaultButton = useRef(null);

  useEffect(() => {
    defaultButton.current.focus();
  }, []);

  return (
    <ModalContainer onCancel={onCancel}>
      <div className="flex flex-col items-center justify-center">
        <span className="font-semibold">
          ¿Quieres eliminar esta publicación?
        </span>
        <span className="text-sm">
          Esta acción no se puede revertir, eliminará de la plataforma y de los
          resultados de búsqueda.
        </span>
        <div className="flex mt-4 flex-row-reverse">
          <button
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-300 text-base font-medium text-white hover:bg-red-700  sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onConfirm}
          >
            Eliminar
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

export default DeleteModal;
