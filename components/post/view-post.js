import React from "react";
import TextEmoji from "../common/textEmoji";

function ViewPost({ post, onCancel, onDelete }) {
  return (
    <div className=" min-h-screenpt-4 w-full px-4 pb-20 text-center sm:block sm:p-0"
      onKeyDownCapture={(e) => {
        if (e.key === "Escape") onCancel();
      }}
    >
      <div>
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
                  <TextEmoji text={post.title}
                  ></TextEmoji>
                </h3>
                <div>
                  <div className="mt-2 ">
                    <span className="block text-xs font-medium text-gray-700">
                      Descripción
                    </span>
                    <div className="text-sm text-gray-500 w-full h-20 border-gray-50 rounded-lg p-2 border-2">
                      {
                        post.description
                      }
                    </div>
                  </div>
                  {post.postType === "survey" && (
                    <div className="mt-2 flex flex-col ">
                      <span className="text-xs">
                        Detalles de la Encuesta ({post.answerType.name}):
                      </span>
                      <ul className="block list-disc">
                        {post.options.map((option) => {
                          return (<li className=" mt-2 text-sm text-gray-500 w-full " key={option.key}>{option.text}</li>)
                        })}
                      </ul>
                      <div className="mt-2 ">
                        <span className="text-xs">
                          Expira:
                          <br /> <b>
                            {
                              post.expiresBy
                            }
                          </b>
                        </span>
                      </div>
                    </div>)}
                  <div className="mt-2 ">
                    <span className="text-xs">
                      Visible a:
                      <br /><b>
                        {
                          post.scope?.text
                        }
                      </b>
                    </span>
                  </div>
                  <div className="mt-2 ">
                    <span className="text-xs">
                      Publicado:
                      <br /><b>
                        {
                          post.publishedOn
                        }
                      </b>
                    </span>
                  </div>

                </div>

              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button

              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onDelete}
            >
              Eliminar
            </button>
            <button

              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onCancel}
            >
              Cerrar
            </button>

          </div>
        </div>
      </div>
    </div >
  );
}


export default ViewPost;
