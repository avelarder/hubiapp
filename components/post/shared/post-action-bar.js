import React from 'react'

function PostActionBar({ state, onPublish, onCancel, onNext, onBack }) {
    return (
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {state.publishEnabled &&
                <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onPublish}
                    autoFocus
                >
                    Publicar
                </button>}

            {state.nextEnabled &&
                <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onNext}
                    autoFocus
                >
                    Siguiente
                </button>}
            {state.backEnabled &&
                <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onBack}
                    autoFocus
                >
                    Atrás
                </button>}
            {state.closeEnabled &&
                <button
                    autoFocus
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onCancel}
                >
                    Cerrar
                </button>}
        </div>
    )
}

export default PostActionBar
