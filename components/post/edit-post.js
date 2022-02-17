import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/solid";
import moment from "moment";
import React, { useState } from "react";
import ContextualMenu from "../dashboard/contextualMenu";
import NestedContainer from "./shared/nested-container";
import TextInput from "../common/textInput";
import { VALIDATIONS } from "../../utils/UI-Constants";
import { Picker } from "emoji-mart";
import { EmojiHappyIcon } from "@heroicons/react/solid";

function EditPost({ post, onCancel, onDelete, onSave }) {

  const [description, setDescription] = useState(post.description);
  const [title, setTitle] = useState(post.title);

  const addEmoji = (e) => {

    let emoji = e.native;
    const textWithEmoji = title + emoji;

    setTitle(textWithEmoji)
  };

  return (
    <div>
      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
        <h1
          className="text-2xl font-bold text-gray-900 text-center mb-4 align-middle"
        >
          <div className="relative text-gray-400 focus-within:text-gray-600 w-full ">
            <TextInput
              className="text-sm text-gray-500 w-full h-10 border-gray-200 rounded-lg pr-10 border-1 text-2xl font-bold text-center mb-4 align-middle"
              validation={VALIDATIONS.REQUIRED_FREE_TEXT}
              invalidText={"Título es requerido"}
              aria-multiline={true}
              multiple={true}
              placeholder="Ingresa el título de tu aviso aquí."
              value={
                title
              }
              onChange={setTitle}
            ></TextInput>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ContextualMenu className="relative inline-flex" icon={<EmojiHappyIcon width={20} height={20}></EmojiHappyIcon>}>
                <li>
                  <Picker onSelect={addEmoji} />
                </li>
              </ContextualMenu>
            </span>
          </div>
        </h1>
        <div className="md:mr-10 w-full ">

          <NestedContainer title={"Descripción"}>
            <span>
              <TextInput
                className="text-sm text-gray-500 w-full h-10 border-gray-200 rounded-lg pr-10 border-1"
                validation={VALIDATIONS.REQUIRED_FREE_TEXT}
                invalidText={"Título es requerido"}
                aria-multiline={true}
                multiple={true}
                placeholder="Ingresa el título de tu aviso aquí."
                value={description}
                onChange={setDescription}
              ></TextInput>
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
                <span className="text-gray-600 mb-4">{post.allowAddOption?.id === "ENABLED" ?
                  "El usuario podrá agregar opciones." : "Agregar opciones no está disponible."}
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
                Publicado:
              </span>
              <span className="block text-xs text-gray-600 ">{
                post.publishedOn
              }
              </span>
            </div>
          </NestedContainer>

          <NestedContainer title={"Programación:"}>
            <div className="flex flex-col">
              <span className="mb-4">
                {post.schedule ? `${moment(post.schedule).format("DD/MM/YYYY H:mm")} hrs.` : "---"}
              </span>
            </div>
          </NestedContainer>
        </div>
      </div>

      <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          className="w-full inline-flex justify-center rounded-lg border px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700  sm:ml-3 sm:w-auto sm:text-sm"
          onClick={onSave}
        >
          <TrashIcon className="w-5 h-5 mr-2"></TrashIcon> Guardar
        </button>
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


export default EditPost;
