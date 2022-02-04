import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/solid";
import React from "react";
import TextEmoji from "../common/textEmoji";


function NestedContainer({ title, children }) {
  return (
    <div className="mt-2 border-1 border-gray-100 shadow-lg rounded-md sm:text-center p-5">
      <span className="block sm:text-md text-sm font-bold text-gray-500 mb-2 border-b-1 border-gray-200">
        {title}
      </span>
      <span className="block text-gray-600 h-full">
        {children}
      </span>
    </div>
  )
}

function ViewPost({ post, onCancel, onDelete }) {
  return (
    <div>
      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
        <h1
          className="text-2xl font-bold text-gray-900 text-center mb-4 align-middle"
        >
          <TextEmoji text={post.title} className="text-sm text-gray-500 w-full h-20 border-gray-50 rounded-lg p-2 border-1 align-middle items-center justify-start"></TextEmoji>
        </h1>
        <div className="md:mr-10">

          <NestedContainer title={"Descripción"}>
            <span>
              {post.description}
            </span>
          </NestedContainer>
          {post.postType === "survey" && (
            <NestedContainer title={"detalles de la encuesta:"}>
              <div className="flex flex-col">
                <span className="font-medium">
                  {post.answerType.name}
                </span>
                <span className="text-gray-600 mb-4">{post.answerType.id === "SINGLE" ?
                  "El usuario podrá seleccionar solamente una de las opciones al responder la encuesta." : "El usuario podrá seleccionar más una de las opciones al responder la encuesta."}
                </span>
                <span className="font-medium">
                  {"Opciones:"}
                </span>
                <span>
                  <ul>
                    {post.options.map((option) => {
                      return (<li className="text-sm" key={option.key}>{option.text}</li>)
                    })}
                  </ul>
                </span>
                <br></br>
                <span className="font-medium text-gray-700">
                  Expira:
                </span>
                <span className=" text-gray-600">
                  {
                    post.expiresBy
                  }
                </span>
              </div>
            </NestedContainer>
          )}

          <NestedContainer title={"Este anuncio es visible a:"}>
            <div className="flex flex-col">
              <span className="mb-4">
                {post.scope.text}
              </span>
              <span className="font-medium text-gray-700">
                Expira:
              </span>
              <span className="block text-xs text-gray-600 ">{
                post.publishedOn
              }
              </span>
            </div>
          </NestedContainer>
        </div>
      </div>

      <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          className="w-full inline-flex justify-center rounded-lg border px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700  sm:ml-3 sm:w-auto sm:text-sm"
          onClick={onDelete}
        >
          <TrashIcon className="w-5 h-5 mr-2"></TrashIcon> Eliminar
        </button>
        <button
          className="w-full inline-flex justify-center items-center rounded-lg border  px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700  sm:ml-3 sm:w-auto sm:text-sm"
          onClick={onCancel}
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2"></ArrowLeftIcon>Regresar
        </button>

      </div>
    </div >
  );
}


export default ViewPost;
