import React, { useState } from "react";
import classNames from "classnames";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import Select from "../common/select";
import {
  EmojiHappyIcon,
  LinkIcon,
  PaperClipIcon,
  PhotographIcon,
  QuestionMarkCircleIcon,
  VideoCameraIcon,
} from "@heroicons/react/solid";
import PostActionBar from "./shared/post-action-bar";
import SurveyBuilder from "./survey-builder";
import ImageUploader from "./image-uploader";
import TextEmoji from "../common/textEmoji";
import TextInput from "../common/textInput";
import {
  VALIDATIONS
} from "../../utils/UI-Constants";
import ContextualMenu from "../dashboard/contextualMenu";
import Scheduler from "./shared/schedule";
import moment from "moment";

function FieldContainer({ title, children }) {
  return (<div className="mt-2 border-1 border-gray-100 rounded-xl p-2">
    <span className="block text-xs font-semibold text-gray-400">
      {title}
    </span>
    {children}
  </div>)
}

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
      className="mt-2 border-1 rounded-xl border-purple-800 bg-purple-700 text-white w-40 h-40 text-lg font-medium"
      onClick={() => onClick(type)}
    >
      {title}
    </button>
  );
}

function PostTypeScreen({
  postOptions,
  onCurrentStepChange,
  onCurrentOptionChange,
}) {
  const handleCurrentOptionChange = (type) => {
    onCurrentOptionChange(type);
    onCurrentStepChange(2);
  };

  return (
    <div className="flex justify-evenly flex-wrap w-full">
      <PostTile
        title={"Aviso"}
        type={postOptions.find((x) => x.key === "news")}
        onClick={handleCurrentOptionChange}
      ></PostTile>
      <PostTile
        title={"Compra Venta"}
        type={postOptions.find((x) => x.key === "marketplace")}
        onClick={handleCurrentOptionChange}
      ></PostTile>
      <PostTile
        title={"Evento"}
        type={postOptions.find((x) => x.key === "survey")}
        onClick={handleCurrentOptionChange}
      ></PostTile>
      <PostTile
        title={"Alquiler"}
        type={postOptions.find((x) => x.key === "rent")}
        onClick={handleCurrentOptionChange}
      ></PostTile>

    </div>
  );
}

function CreatePost({
  step,
  onStepChanged,
  option,
  onOptionChanged,
  postOptions,
  postScopeOptions,
  postActionBarStatus,

  onCancel,
  onConfirm,
  onPreview,
  onNext,
  onBack
}) {

  const [isFormValid, setIsFormValid] = useState(false);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [postData, setPostData] = useState({
    option: option,
    step: step,
    data: [],
  });

  const [postAttributes, setPostAttributes] = useState([{ key: "scope", value: postScopeOptions[0] }, { key: "postType", value: "news" }, { key: "answerType", value: { id: "SINGLE", text: "Opción Simple" } }, { key: "allowAddOptions", value: false }]);
  const [showSurvey, setShowSurvey] = useState(false);

  const [showImageUploader, setShowImageUploader] = useState(false);

  const addEmoji = (e) => {

    let emoji = e.native;
    const textWithEmoji = (postAttributes.find((x) => x.key === "title")?.value ?? "") + emoji;

    handleTitleChange(textWithEmoji)
  };

  const setAttributeValue = (fieldName, value) => {
    const field = postAttributes.find((x) => x.key === fieldName)
    if (field) {
      const index = postAttributes.indexOf(field);
      postAttributes[index].value = value;
      setPostAttributes([...postAttributes]);
    } else {
      setPostAttributes([
        ...postAttributes,
        {
          key: fieldName,
          value: value,
        },
      ]);
    }
  };

  const handleOptionsChange = (options) => {
    setAttributeValue("options", options);
  };
  const handleExpiresChange = (expiration) => {
    setAttributeValue("expiresBy", expiration);
  };
  const handlePostTypeChange = (postType) => {
    setAttributeValue("postType", postType);
  };
  const handleAnswerTypeChange = (answerType) => {
    setAttributeValue("answerType", answerType);
  };

  const handleScopeChange = (newScope) => {
    setAttributeValue("scope", newScope);
  };


  const handleDescriptionChange = (description) => {
    setAttributeValue("description", description);
  };

  const handleTitleChange = (title) => {
    setAttributeValue("title", title);
  };

  const handlePostDataChange = () => {
    let isValid = true;

    const postType = postAttributes.find((x) => x.key === "postType");
    if (postType.value === "survey") {
      isValid = isValid && postAttributes.find((x) => x.key === "answerType")?.value
        && postAttributes.find((x) => x.key === "options")?.value.length > 0
        && postAttributes.find((x) => x.key === "options")?.value.every(x => x?.text.length > 0)
        && VALIDATIONS.DATE_AFTER(postAttributes.find((x) => x.key === "expiresBy")?.value);
    }
    isValid = isValid && postAttributes.find((x) => x.key === "title")?.value;

    if (scheduleEnabled && postAttributes.find((x) => x.key === "schedule")) {
      isValid = isValid && VALIDATIONS.DATETIME_AFTER(postAttributes.find((x) => x.key === "schedule")?.value);
    }

    if (isValid) {
      let latestPostData = { ...postData, data: postAttributes };
      setPostData(latestPostData);
      onPreview(latestPostData);
    }
    setIsFormValid(isValid);
  };

  const handlePostDataSubmit = () => {
    onConfirm(postData);
  }

  const handleShowSurvey = () => {
    const toggleSurvey = !showSurvey;
    if (toggleSurvey) {
      handlePostTypeChange("survey");
      handleAnswerTypeChange({ id: "SINGLE", text: "Opción simple" });
    }
    else {
      handlePostTypeChange("news");
      handleAnswerTypeChange(null);
    }
    setShowSurvey(toggleSurvey)

  }

  const handleShowImages = () => {
    setShowImageUploader(!showImageUploader)
  }

  const handleAllowAddOptionChange = (allowAddOption) => {
    setAttributeValue("allowAddOption", allowAddOption);
  }

  const handleScheduleChanged = (schedule) => {
    const scheduleDate = moment(`${schedule.year}-${schedule.month}-${schedule.day} ${schedule.hour}:${schedule.minute}`, "YYYY-M-D H:m", true);
    setAttributeValue("schedule", scheduleDate);
  }


  const getScheduleMonths = () => [
    { id: 1, text: "Enero" },
    { id: 2, text: "Febrero" },
    { id: 3, text: "Marzo" },
    { id: 4, text: "Abril" },
    { id: 5, text: "Mayo" },
    { id: 6, text: "Junio" },
    { id: 7, text: "Julio" },
    { id: 8, text: "Agosto" },
    { id: 9, text: "Setiembre" },
    { id: 10, text: "Octubre" },
    { id: 11, text: "Noviembre" },
    { id: 12, text: "Diciembre" },
  ];


  const getScheduleYears = () => {
    const years = [];
    const initYear = (new Date()).getFullYear()

    for (let i = initYear; i < initYear + 20; i++) {
      years.push({ id: i, text: i });
    }
    return years;
  }
  const getScheduleDays = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push({ id: i, text: i });
    }
    return days;
  }
  const getScheduleHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push({ id: i, text: i });
    }
    return hours;
  }
  const getScheduleMinutes = () => [
    { id: 0, text: "00" },
    { id: 15, text: "15" },
    { id: 30, text: "30" },
    { id: 45, text: "45" },
  ];

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
                    currentStep={step}
                    totalSteps={option ? option.steps : 0}
                  ></PostIndicator>
                  {/* Step Container */}
                  {step === 1 && (
                    <PostTypeScreen
                      postOptions={postOptions}
                      onCurrentStepChange={onStepChanged}
                      onCurrentOptionChange={onOptionChanged}
                    ></PostTypeScreen>
                  )}
                  {step === 2 && (
                    <div>
                      <div className="mt-2 ">
                        <Select
                          title={"Tu aviso será visible a:"}
                          showTitle={true}
                          options={postScopeOptions}
                          selectedOption={
                            postScopeOptions.find(
                              (x) =>
                                x.id ===
                                postAttributes.find((x) => x.key === "scope")
                                  ?.value.id
                            ) ?? postScopeOptions[0]
                          }
                          onOptionChanged={handleScopeChange}
                        ></Select>
                      </div>
                      <div className="mt-2 ">
                        <span className="block text-sm font-medium text-gray-700">
                          Título
                        </span>
                        <div className="flex items-center">
                          <div className="relative text-gray-400 focus-within:text-gray-600 w-full ">
                            <TextInput
                              className="text-sm text-gray-500 w-full h-10 border-gray-200 rounded-lg pr-10 border-1"
                              validation={VALIDATIONS.REQUIRED_FREE_TEXT}
                              invalidText={"Título es requerido"}
                              aria-multiline={true}
                              multiple={true}
                              placeholder="Ingresa el título de tu aviso aquí."
                              value={
                                postAttributes.find((x) => x.key === "title")?.value
                              }
                              onChange={handleTitleChange}
                            ></TextInput>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                              <ContextualMenu className="relative inline-flex" icon={<EmojiHappyIcon width={20} height={20}></EmojiHappyIcon>}>
                                <li>
                                  <Picker onSelect={addEmoji} />
                                </li>
                              </ContextualMenu>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 ">
                        <span className="block text-sm font-medium text-gray-700">
                          Descripción
                        </span>
                        <TextInput
                          className="text-sm text-gray-500 w-full h-10 border-gray-200 rounded-lg border-1"

                          rows={5}
                          minRows={3}
                          maxRows={10}
                          placeholder="Ingresa la descripción de tu aviso aquí."
                          value={
                            postAttributes.find((x) => x.key === "description")
                              ?.value
                          }
                          onChange={handleDescriptionChange}
                        ></TextInput>
                      </div>
                      <div className="mt-2 flex flex-row-reverse">
                        <QuestionMarkCircleIcon onClick={handleShowSurvey} className={"flex text-purple-600 w-9 h-8 border-1  m-1 rounded-sm cursor-pointer " + (showSurvey ? "border-purple-600" : "border-purple-50")}></QuestionMarkCircleIcon>
                        <PhotographIcon onClick={handleShowImages} className={"flex text-purple-600 w-9 h-8 border-1  m-1 rounded-sm cursor-pointer " + (showImageUploader ? "border-purple-600" : "border-purple-50")}></PhotographIcon>
                        <VideoCameraIcon className="flex text-purple-600 w-9 h-8 border-1 border-purple-50 m-1  rounded-sm cursor-pointer"></VideoCameraIcon>
                        <PaperClipIcon className="flex text-purple-600 w-9 h-8 border-1 border-purple-50 m-1  rounded-sm cursor-pointer"></PaperClipIcon>
                        <LinkIcon className="flex text-purple-600 w-9 h-8 border-1 border-purple-50 m-1  rounded-sm cursor-pointer"></LinkIcon>
                      </div>
                      <div className="mt-2 ">
                        {showImageUploader && <ImageUploader></ImageUploader>}
                      </div>
                      <div className="mt-2 ">
                        {showSurvey &&
                          <SurveyBuilder
                            answerType={postAttributes.find((x) => x.key === "answerType")
                              ?.value}
                            allowAddOption={postAttributes.find((x) => x.key === "allowAddOption")
                              ?.value}
                            expirationDate={postAttributes.find((x) => x.key === "expiresBy")
                              ?.value}
                            options={postAttributes.find((x) => x.key === "options")?.value
                              ?? []}
                            onAnswerTypeChanged={handleAnswerTypeChange}
                            onExpirationChanged={handleExpiresChange}
                            onOptionChanged={handleOptionsChange}
                            onAddOptionChanged={handleAllowAddOptionChange}
                          >
                          </SurveyBuilder>}
                      </div>
                      <div className="mt-2">
                        <Scheduler
                          enabled={scheduleEnabled}
                          setEnabled={setScheduleEnabled}
                          schedule={(postAttributes.find((x) => x.key === "schedule") ? moment(postAttributes.find((x) => x.key === "schedule")?.value, true) : moment(new Date(), true))}
                          onScheduleChanged={handleScheduleChanged}
                          years={getScheduleYears()}
                          months={getScheduleMonths()}
                          days={getScheduleDays()}
                          hours={getScheduleHours()}
                          minutes={getScheduleMinutes()}
                        >
                        </Scheduler>
                      </div>
                    </div>
                  )}
                  {step === option?.steps && (
                    <div>
                      <FieldContainer title={"Título"}>
                        <TextEmoji text={postAttributes.find((x) => x.key === "title")?.value}></TextEmoji>
                      </FieldContainer>
                      <FieldContainer title={"Descripción"}>
                        <div className="w-full">
                          {postAttributes.find((x) => x.key === "description")?.value}
                        </div>
                      </FieldContainer>
                      {postAttributes.find((x) => x.key === "postType")?.value === "survey" && (
                        <FieldContainer title={"Opciones de la Encuesta"}>
                          {postAttributes.find((x) => x.key === "answerType")?.value.text}
                          <br></br>
                          Permitir al usuario agregar opciones a la encuesta? {postAttributes.find((x) => x.key === "allowAddOption")?.value.text}
                          <br></br>
                          <div className="ml-5">
                            <ul className="block list-disc">
                              {postAttributes.find((x) => x.key === "options").value.map((option) => {
                                return (<li className="w-full" key={option.key}>
                                  {
                                    option.text
                                  }
                                </li>)
                              })}
                            </ul>
                          </div>
                          <br></br>
                          {"Expira en " + postAttributes.find((x) => x.key === "expiresBy")?.value}
                        </FieldContainer>
                      )}
                      <FieldContainer title={"Visible a:"}>
                        {postAttributes.find((x) => x.key === "scope")?.value.text}
                      </FieldContainer>
                      <FieldContainer title={"Programación:"}>
                        {postAttributes.find((x) => x.key === "schedule")?.value ? `${moment(postAttributes.find((x) => x.key === "schedule")?.value).format("DD/MM/YYYY HH:mm")} hrs.` : "Sin programación"}
                      </FieldContainer>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <PostActionBar
              state={postActionBarStatus}
              onCancel={onCancel}
              onNext={handlePostDataChange}
              onBack={onBack}
              isNextDisabled={isFormValid}
              onPublish={handlePostDataSubmit}
            ></PostActionBar>
          </div>
        </div>
      </div>
    </div >
  );
}

export default CreatePost;
