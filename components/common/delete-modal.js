import React from 'react';
import ModalContainer from './modal';

function DeleteModal({ onConfirm, onCancel }) {

    return (
        <ModalContainer onCancel={onCancel}>
            <div className="flex flex-col items-center justify-center">
                <span>Esta operación no es reversible, desea continuar?</span>
                <div className="flex mt-4 flex-row-reverse">
                    <button className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-300 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600 sm:ml-3 sm:w-auto sm:text-sm" onClick={onConfirm}>Eliminar</button>
                    <button className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600 sm:ml-3 sm:w-auto sm:text-sm" onClick={onCancel}>Cerrar</button>
                </div>
            </div>
        </ModalContainer>
    );
}

export default DeleteModal;
