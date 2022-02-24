import { ArrowLeftIcon, SaveIcon, TrashIcon } from "@heroicons/react/solid";
import moment from "moment";
import React, { useState } from "react";
import ContextualMenu from "../dashboard/contextualMenu";
import NestedContainer from "./shared/nested-container";
import TextInput from "../common/textInput";
import { VALIDATIONS, postScopeOptions, getScheduleHours, getScheduleDays, getScheduleMinutes, getScheduleMonths, getScheduleYears } from "../../utils/UI-Constants";
import { Picker } from "emoji-mart";
import { EmojiHappyIcon } from "@heroicons/react/solid";
import Select from "../common/select";
import Scheduler from "./shared/schedule";
import SurveyBuilder from "./survey-builder";

function EditPost({ post, onCancel, onDelete, onSave }) {


  const [description, setDescription] = useState(post.description);
  const [title, setTitle] = useState(post.title);
  const [scope, setScope] = useState(post.scope);
  const [scheduleEnabled, setScheduleEnabled] = useState(post.schedule ? true : false);
  const [schedule, setSchedule] = useState(post.schedule ? post.schedule : null);
  const [postOptions, setOptions] = useState(post.options ? post.options : null);
  const [answerType, setAnswerType] = useState(post.answerType ? post.answerType : null);
  const [allowAddOption, setAllowAddOption] = useState(post.allowAddOption ? post.allowAddOption : null);
  const [expiresBy, setExpiresBy] = useState(post.expiresBy ? post.expiresBy : null);

  const addEmoji = (e) => {

    let emoji = e.native;
    const textWithEmoji = title + emoji;

    setTitle(textWithEmoji)
  };

  const handleScheduleChanged = (schedule) => {
    const scheduleDate = moment(`${schedule.year}-${schedule.month}-${schedule.day} ${schedule.hour}:${schedule.minute}`, "YYYY-M-D H:m", true);
    setSchedule(scheduleDate.toISOString());
  }

  const handleOptionChanged = (options) => {
    setOptions([...options]);
  }

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
            <NestedContainer title={"Detalles de la encuesta:"}>
              <SurveyBuilder
                answerType={answerType}
                allowAddOption={allowAddOption}
                expirationDate={expiresBy}
                options={postOptions}
                onAnswerTypeChanged={setAnswerType}
                onExpirationChanged={setExpiresBy}
                onOptionChanged={handleOptionChanged}
                onAddOptionChanged={setAllowAddOption}
              >
              </SurveyBuilder>
            </NestedContainer>
          )}
          {<NestedContainer title={"Programación:"}>
            <div className="flex flex-col items-center ">
              <Scheduler
                enabled={scheduleEnabled}
                setEnabled={setScheduleEnabled}
                schedule={(schedule ? moment(schedule, true) : moment(new Date(), true))}
                onScheduleChanged={handleScheduleChanged}
                years={getScheduleYears()}
                months={getScheduleMonths()}
                days={getScheduleDays()}
                hours={getScheduleHours()}
                minutes={getScheduleMinutes()}
              >
              </Scheduler>
            </div>
          </NestedContainer>}
          <NestedContainer title={"Este anuncio es visible a:"}>
            <div className="flex flex-col">
              <Select
                title={"Tu aviso será visible a:"}
                showTitle={true}
                options={postScopeOptions}
                selectedOption={scope}
                onOptionChanged={setScope}
              ></Select>
              <br></br>
              <span className="font-medium text-gray-700">
                Fecha de Publicación:
              </span>
              <span className="block text-md text-gray-600 ">{
                post.publishedOn
              }
              </span>
            </div>
          </NestedContainer>


        </div>
      </div >

      <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          className="w-full inline-flex justify-center rounded-lg border px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700  sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => {
            onSave({ ...post, ...{ description, title, scope, schedule: scheduleEnabled ? schedule : null, options: postOptions, answerType, allowAddOption, expiresBy } });
          }}
        >
          <SaveIcon className="w-5 h-5 mr-2"></SaveIcon> Guardar
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
