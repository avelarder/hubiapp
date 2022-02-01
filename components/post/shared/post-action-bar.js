import React from 'react'
import { ArrowLeftIcon, ArrowRightIcon, ShareIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'

function PostActionBar({ state, onPublish, onCancel, onNext, onBack }) {
    return (
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {state.publishEnabled &&
                <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-lg border px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600 sm:w-auto sm:text-sm xs:mb-3"
                    onClick={onPublish}
                    autoFocus
                >
                    <ShareIcon className="w-5 h-5 mr-2"></ShareIcon>Publicar
                </button>}

            {state.nextEnabled &&
                <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-lg border px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600 sm:w-auto sm:text-sm xs:mb-3"
                    onClick={onNext}
                    autoFocus
                >
                    <ArrowRightIcon className="w-5 h-5 mr-2"></ArrowRightIcon>Siguiente
                </button>}
            {state.backEnabled &&
                <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-lg border px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600 sm:w-auto sm:text-sm xs:mb-3"
                    onClick={onBack}
                    autoFocus
                >
                    <ArrowLeftIcon className="w-5 h-5 mr-2"></ArrowLeftIcon>Atrás
                </button>}
            {state.closeEnabled &&
                <button
                    autoFocus
                    type="button"
                    className="w-full inline-flex justify-center rounded-lg border px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600 sm:w-auto sm:text-sm xs:mb-3"
                    onClick={onCancel}
                >
                    <XIcon className="w-5 h-5 mr-2"></XIcon>Cerrar
                </button>}
        </div>
    )
}

export default PostActionBar
