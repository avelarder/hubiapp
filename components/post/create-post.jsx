import React, { useState } from "react";
import classNames from "classnames";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
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
import { VALIDATIONS } from "../../utils/UI-Constants";
import ContextualMenu from "../dashboard/contextualMenu";
import Scheduler from "./shared/schedule";
import moment from "moment";
import {
  getScheduleHours,
  getScheduleMinutes,
  getScheduleYears,
  getScheduleMonths,
  getScheduleDays,
} from "../../utils/UI-Constants";
import FieldContainer from "../common/field-container";
import { StyledButton } from "../admin/base-ui-components";

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

function PostTile({ type, onClick, children }) {
  return (
    <div
      className="mt-2 border-1 bg-gradient-to-tr from-gray-200 to-gray-100  w-52 h-48 text-lg font-medium cursor-pointer hover:border-gray-400"
      onClick={() => onClick(type)}
    >
      {children}
    </div>
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
        type={postOptions.find((x) => x.key === "news")}
        onClick={handleCurrentOptionChange}
      >
        <div className="flex flex-col justify-start items-center h-full mt-10">
          <div className="flex flex-col justify-center items-center">
            <svg
              width="35"
              height="39"
              viewBox="0 0 35 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.625 4.5H25V0.75H21.25V4.5H13.75V0.75H10V4.5H4.375C2.30687 4.5 0.625 6.18187 0.625 8.25V34.5C0.625 36.5681 2.30687 38.25 4.375 38.25H30.625C32.6931 38.25 34.375 36.5681 34.375 34.5V8.25C34.375 6.18187 32.6931 4.5 30.625 4.5ZM4.375 34.5V10.125H30.625V8.25L30.6288 34.5H4.375Z"
                fill="black"
              />
              <path
                d="M8.125 13.875H26.875V17.625H8.125V13.875ZM8.125 21.375H17.5V25.125H8.125V21.375Z"
                fill="black"
              />
            </svg>
            <span className="font-bold">{"Publicación"}</span>
          </div>
          <div className="flex w-full justify-center items-center text-sm text-center">
            {"Publica un informe, avisos, encuesta, etc."}
          </div>
        </div>
      </PostTile>
      <PostTile
        type={postOptions.find((x) => x.key === "marketplace")}
        onClick={handleCurrentOptionChange}
      >
        <div className="flex flex-col justify-start items-center h-full mt-10">
          <div className="flex flex-col justify-center items-center">
            <svg
              width="35"
              height="39"
              viewBox="0 0 35 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.625 19.5H26.875V30.75H15.625V19.5Z" fill="black" />
              <path
                d="M30.625 4.5H26.875V0.75H23.125V4.5H11.875V0.75H8.125V4.5H4.375C2.30687 4.5 0.625 6.18187 0.625 8.25V34.5C0.625 36.5681 2.30687 38.25 4.375 38.25H30.625C32.6931 38.25 34.375 36.5681 34.375 34.5V8.25C34.375 6.18187 32.6931 4.5 30.625 4.5ZM30.6269 34.5H4.375V12H30.625L30.6269 34.5Z"
                fill="black"
              />
            </svg>

            <span className="font-bold">{"Evento"}</span>
          </div>
          <div className="flex w-full justify-center items-center text-sm text-center">
            {"Programa una reunión, asamblea, evento deportivo, etc. "}
          </div>
        </div>
      </PostTile>
      <PostTile
        type={postOptions.find((x) => x.key === "survey")}
        onClick={handleCurrentOptionChange}
      >
        <div className="flex flex-col justify-start items-center h-full mt-10">
          <div className="flex flex-col justify-center items-center">
            <svg
              width="103"
              height="39"
              viewBox="0 0 103 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.8313 1.29375C20.6569 1.11801 20.4496 0.97852 20.2211 0.883329C19.9926 0.788137 19.7475 0.739128 19.5 0.739128C19.2525 0.739128 19.0074 0.788137 18.7789 0.883329C18.5504 0.97852 18.3431 1.11801 18.1688 1.29375L1.29376 18.1688C1.11802 18.3431 0.978527 18.5504 0.883336 18.7789C0.788145 19.0074 0.739136 19.2525 0.739136 19.5C0.739136 19.7475 0.788145 19.9926 0.883336 20.2211C0.978527 20.4496 1.11802 20.6569 1.29376 20.8312C1.46896 21.005 1.67674 21.1425 1.90518 21.2358C2.13363 21.3291 2.37825 21.3764 2.62501 21.375H4.50001V34.5C4.50001 35.4946 4.8951 36.4484 5.59836 37.1516C6.30162 37.8549 7.25545 38.25 8.25001 38.25H30.75C31.7446 38.25 32.6984 37.8549 33.4017 37.1516C34.1049 36.4484 34.5 35.4946 34.5 34.5V21.375H36.375C36.8723 21.375 37.3492 21.1775 37.7008 20.8258C38.0525 20.4742 38.25 19.9973 38.25 19.5C38.2514 19.2532 38.2041 19.0086 38.1108 18.7802C38.0175 18.5517 37.88 18.344 37.7063 18.1688L20.8313 1.29375ZM8.25001 34.5V16.5187L19.5 5.26875L30.75 16.5187V34.5H8.25001Z"
                fill="black"
              />
              <path
                d="M100.375 15.75H66.625C66.1277 15.75 65.6508 15.9475 65.2992 16.2992C64.9475 16.6508 64.75 17.1277 64.75 17.625C64.7501 20.9162 65.6165 24.1495 67.2621 26.9997C68.9078 29.85 71.2747 32.2169 74.125 33.8625V36.375C74.125 36.8723 74.3225 37.3492 74.6742 37.7008C75.0258 38.0525 75.5027 38.25 76 38.25H91C91.4973 38.25 91.9742 38.0525 92.3258 37.7008C92.6775 37.3492 92.875 36.8723 92.875 36.375V33.8625C95.7253 32.2169 98.0922 29.85 99.7379 26.9997C101.384 24.1495 102.25 20.9162 102.25 17.625C102.25 17.1277 102.052 16.6508 101.701 16.2992C101.349 15.9475 100.872 15.75 100.375 15.75ZM90.1562 31.05C89.8442 31.2072 89.5823 31.4486 89.4001 31.7467C89.2178 32.0449 89.1226 32.3881 89.125 32.7375V34.5H77.875V32.7375C77.8774 32.3881 77.7822 32.0449 77.5999 31.7467C77.4177 31.4486 77.1558 31.2072 76.8438 31.05C74.6255 29.9532 72.713 28.3246 71.2768 26.3093C69.8406 24.2941 68.9253 21.9548 68.6125 19.5H98.3875C98.0747 21.9548 97.1594 24.2941 95.7232 26.3093C94.287 28.3246 92.3745 29.9532 90.1562 31.05ZM77.875 13.875V11.8687C77.8722 9.66306 77.0115 7.54495 75.475 5.9625C75.0403 5.52323 74.6971 5.00203 74.4654 4.42911C74.2336 3.85619 74.1179 3.24297 74.125 2.625V0.75H70.375V2.625C70.368 4.84366 71.2294 6.977 72.775 8.56875C73.6438 9.44684 74.1293 10.6335 74.125 11.8687V13.875H77.875ZM85.375 13.875V11.8687C85.3722 9.66306 84.5115 7.54495 82.975 5.9625C82.5403 5.52323 82.1971 5.00203 81.9654 4.42911C81.7336 3.85619 81.6179 3.24297 81.625 2.625V0.75H77.875V2.625C77.8778 4.83069 78.7385 6.9488 80.275 8.53125C80.7097 8.97052 81.0529 9.49172 81.2846 10.0646C81.5164 10.6376 81.6321 11.2508 81.625 11.8687V13.875H85.375ZM92.875 13.875V11.8687C92.8722 9.66306 92.0115 7.54495 90.475 5.9625C90.0403 5.52323 89.6971 5.00203 89.4654 4.42911C89.2336 3.85619 89.1179 3.24297 89.125 2.625V0.75H85.375V2.625C85.3778 4.83069 86.2385 6.9488 87.775 8.53125C88.2097 8.97052 88.5529 9.49172 88.7846 10.0646C89.0164 10.6376 89.1321 11.2508 89.125 11.8687V13.875H92.875Z"
                fill="black"
              />
            </svg>
            <span className="font-bold">{"Compra Venta"}</span>
          </div>
          <div className="flex w-full justify-center items-center text-sm text-center">
            {"Publica un informe, avisos, encuesta, etc."}
          </div>
        </div>
      </PostTile>
      <PostTile
        type={postOptions.find((x) => x.key === "rent")}
        onClick={handleCurrentOptionChange}
      >
        <div className="flex flex-col justify-start items-center h-full mt-10">
          <div className="flex flex-col justify-center items-center">
            <svg
              width="39"
              height="39"
              viewBox="0 0 39 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.5 0.75C15.7916 0.75 12.1665 1.84967 9.08305 3.90994C5.99963 5.97022 3.5964 8.89857 2.17725 12.3247C0.758109 15.7508 0.386796 19.5208 1.11027 23.1579C1.83374 26.7951 3.61951 30.136 6.24174 32.7583C8.86398 35.3805 12.2049 37.1663 15.8421 37.8897C19.4792 38.6132 23.2492 38.2419 26.6753 36.8227C30.1014 35.4036 33.0298 33.0004 35.09 29.9169C37.1503 26.8335 38.25 23.2084 38.25 19.5C38.25 17.0377 37.765 14.5995 36.8227 12.3247C35.8805 10.0498 34.4993 7.98285 32.7582 6.24175C31.0171 4.50065 28.9502 3.11953 26.6753 2.17726C24.4005 1.23498 21.9623 0.75 19.5 0.75ZM19.5 34.5C16.5333 34.5 13.6332 33.6203 11.1664 31.972C8.6997 30.3238 6.77712 27.9811 5.6418 25.2403C4.50649 22.4994 4.20944 19.4834 4.78821 16.5736C5.36699 13.6639 6.7956 10.9912 8.89339 8.8934C10.9912 6.79561 13.6639 5.367 16.5736 4.78822C19.4834 4.20944 22.4994 4.50649 25.2402 5.64181C27.9811 6.77712 30.3238 8.69971 31.972 11.1664C33.6203 13.6332 34.5 16.5333 34.5 19.5C34.5 23.4782 32.9196 27.2936 30.1066 30.1066C27.2936 32.9196 23.4782 34.5 19.5 34.5Z"
                fill="black"
              />
              <path
                d="M19.5 17.625C15.75 17.625 15.75 16.4438 15.75 15.75C15.75 15.0563 17.0625 13.875 19.5 13.875C21.9375 13.875 22.1062 15.075 22.125 15.75H25.875C25.8497 14.4727 25.3902 13.242 24.5724 12.2605C23.7545 11.2791 22.6268 10.6053 21.375 10.35V8.25H17.625V10.2938C13.875 10.9125 12 13.3313 12 15.75C12 17.85 12.975 21.375 19.5 21.375C23.25 21.375 23.25 22.65 23.25 23.25C23.25 23.85 22.0875 25.125 19.5 25.125C16.05 25.125 15.75 23.5125 15.75 23.25H12C12 24.975 13.2375 28.0312 17.625 28.725V30.75H21.375V28.725C25.125 28.0875 27 25.6688 27 23.25C27 21.15 26.025 17.625 19.5 17.625Z"
                fill="black"
              />
            </svg>

            <span className="font-bold">{"Alquiler"}</span>
          </div>
          <div className="flex w-full justify-center items-center text-sm text-center">
            {
              "Publica el alquiler de departamento, casa, cochera, anticresis, etc."
            }
          </div>
        </div>
      </PostTile>
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
  onBack,
}) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [postData, setPostData] = useState({
    option: option,
    step: step,
    data: [],
  });

  const [postAttributes, setPostAttributes] = useState([
    { key: "scope", value: postScopeOptions[0] },
    { key: "postType", value: "news" },
    { key: "answerType", value: { id: "SINGLE", text: "Opción Simple" } },
    { key: "allowAddOptions", value: false },
  ]);
  const [showSurvey, setShowSurvey] = useState(false);

  const [showImageUploader, setShowImageUploader] = useState(false);

  const addEmoji = (e) => {
    let emoji = e.native;
    const textWithEmoji =
      (postAttributes.find((x) => x.key === "title")?.value ?? "") + emoji;

    handleTitleChange(textWithEmoji);
  };

  const setAttributeValue = (fieldName, value) => {
    const field = postAttributes.find((x) => x.key === fieldName);
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
      isValid =
        isValid &&
        postAttributes.find((x) => x.key === "answerType")?.value &&
        postAttributes.find((x) => x.key === "options")?.value.length > 0 &&
        postAttributes
          .find((x) => x.key === "options")
          ?.value.every((x) => x?.text.length > 0) &&
        VALIDATIONS.DATE_AFTER(
          postAttributes.find((x) => x.key === "expiresBy")?.value
        );
    }
    isValid = isValid && postAttributes.find((x) => x.key === "title")?.value;

    if (scheduleEnabled && postAttributes.find((x) => x.key === "schedule")) {
      isValid =
        isValid &&
        VALIDATIONS.DATETIME_AFTER(
          postAttributes.find((x) => x.key === "schedule")?.value
        );
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
  };

  const handleShowSurvey = () => {
    const toggleSurvey = !showSurvey;
    if (toggleSurvey) {
      handlePostTypeChange("survey");
      handleAnswerTypeChange({ id: "SINGLE", text: "Opción simple" });
    } else {
      handlePostTypeChange("news");
      handleAnswerTypeChange(null);
    }
    setShowSurvey(toggleSurvey);
  };

  const handleShowImages = () => {
    setShowImageUploader(!showImageUploader);
  };

  const handleAllowAddOptionChange = (allowAddOption) => {
    setAttributeValue("allowAddOption", allowAddOption);
  };

  const handleScheduleChanged = (schedule) => {
    const scheduleDate = moment(
      `${schedule.year}-${schedule.month}-${schedule.day} ${schedule.hour}:${schedule.minute}`,
      "YYYY-M-D H:m",
      true
    );
    setAttributeValue("schedule", scheduleDate);
  };

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
                    className="text-3xl leading-6 font-bold text-gray-900 text-center my-2"
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
                                postAttributes.find((x) => x.key === "title")
                                  ?.value
                              }
                              onChange={handleTitleChange}
                            ></TextInput>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                              <ContextualMenu
                                className="relative inline-flex"
                                icon={
                                  <EmojiHappyIcon
                                    width={20}
                                    height={20}
                                  ></EmojiHappyIcon>
                                }
                              >
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
                      <div className="mt-2 flex border-1 rounded-md p-3 text-sm items-center h-16 ">
                        <span className="flex flex-1">
                          Agrega a tu publicación
                        </span>
                        {/* Survey */}
                        <div
                          className="flex m-2 items-center justify-center cursor-pointer"
                          onClick={handleShowSurvey}
                        >
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 30 40"
                            fill={showSurvey ? "rgb(124, 58, 237)" : "#604D4D"}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M5.66666 12.3333H17.3333V15.6667H5.66666V12.3333ZM5.66666 5.66667H23.95V9H5.66666V5.66667ZM5.66666 19H27.3333V22.3333H5.66666V19ZM0.666664 0.666672H4V27.3333H0.666664V0.666672Z" />
                          </svg>
                        </div>
                        {/* Images */}
                        <div
                          className="flex m-2 items-center justify-center cursor-pointer"
                          onClick={handleShowImages}
                        >
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 40"
                            fill={showSurvey ? "rgb(124, 58, 237)" : "#604D4D"}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M26.6667 0H3.33333C1.495 0 0 1.495 0 3.33333V26.6667C0 28.505 1.495 30 3.33333 30H26.6667C28.505 30 30 28.505 30 26.6667V3.33333C30 1.495 28.505 0 26.6667 0ZM3.33333 26.6667V3.33333H26.6667L26.67 26.6667H3.33333Z" />
                            <path d="M11.6667 18.3333L10 16.6667L5 23.3333H25L16.6667 11.6667L11.6667 18.3333Z" />
                          </svg>
                        </div>
                        {/* Video */}
                        <div className="flex m-2 items-center justify-center">
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 35"
                            fill={showSurvey ? "rgb(124, 58, 237)" : "#604D4D"}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M27 3.66666C27 1.82833 25.505 0.333328 23.6667 0.333328H3.66666C1.82833 0.333328 0.333328 1.82833 0.333328 3.66666V20.3333C0.333328 22.1717 1.82833 23.6667 3.66666 23.6667H23.6667C25.505 23.6667 27 22.1717 27 20.3333V14.7783L33.6667 20.3333V3.66666L27 9.22166V3.66666ZM23.67 20.3333H3.66666V3.66666H23.6667L23.6683 11.9983L23.6667 12L23.6683 12.0017L23.67 20.3333Z" />
                          </svg>
                        </div>
                        {/* Files */}
                        <div className="flex m-2 items-center justify-center">
                          <svg
                            width="25"
                            height="25"
                            viewBox="0 0 30 40"
                            fill={showSurvey ? "rgb(124, 58, 237)" : "#604D4D"}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M27.1717 11.31C27.0926 11.1291 26.982 10.9637 26.845 10.8217L16.845 0.821662C16.7029 0.684632 16.5375 0.574014 16.3567 0.494995C16.3067 0.471661 16.2533 0.458328 16.2 0.439995C16.0605 0.392539 15.9154 0.363952 15.7683 0.354995C15.7333 0.351662 15.7017 0.333328 15.6667 0.333328H3.99999C2.16166 0.333328 0.666656 1.82833 0.666656 3.66666V30.3333C0.666656 32.1717 2.16166 33.6667 3.99999 33.6667H24C25.8383 33.6667 27.3333 32.1717 27.3333 30.3333V12C27.3333 11.965 27.315 11.9333 27.3117 11.8967C27.3035 11.7495 27.2749 11.6042 27.2267 11.465C27.21 11.4117 27.195 11.36 27.1717 11.31ZM21.6433 10.3333H17.3333V6.02333L21.6433 10.3333ZM3.99999 30.3333V3.66666H14V12C14 12.442 14.1756 12.8659 14.4881 13.1785C14.8007 13.4911 15.2246 13.6667 15.6667 13.6667H24L24.0033 30.3333H3.99999Z" />
                            <path d="M7.33334 17H20.6667V20.3333H7.33334V17ZM7.33334 23.6667H20.6667V27H7.33334V23.6667ZM7.33334 10.3333H10.6667V13.6667H7.33334V10.3333Z" />
                          </svg>
                        </div>
                      </div>
                      <div className="mt-2 ">
                        {showImageUploader && <ImageUploader></ImageUploader>}
                      </div>
                      <div className="mt-2 ">
                        {showSurvey && (
                          <SurveyBuilder
                            answerType={
                              postAttributes.find((x) => x.key === "answerType")
                                ?.value
                            }
                            allowAddOption={
                              postAttributes.find(
                                (x) => x.key === "allowAddOption"
                              )?.value
                            }
                            expirationDate={
                              postAttributes.find((x) => x.key === "expiresBy")
                                ?.value
                            }
                            options={
                              postAttributes.find((x) => x.key === "options")
                                ?.value ?? []
                            }
                            onAnswerTypeChanged={handleAnswerTypeChange}
                            onExpirationChanged={handleExpiresChange}
                            onOptionChanged={handleOptionsChange}
                            onAddOptionChanged={handleAllowAddOptionChange}
                          ></SurveyBuilder>
                        )}
                      </div>
                      <div className="mt-2">
                        <Scheduler
                          enabled={scheduleEnabled}
                          setEnabled={setScheduleEnabled}
                          schedule={
                            postAttributes.find((x) => x.key === "schedule")
                              ? moment(
                                  postAttributes.find(
                                    (x) => x.key === "schedule"
                                  )?.value,
                                  true
                                )
                              : moment(new Date(), true)
                          }
                          onScheduleChanged={handleScheduleChanged}
                          years={getScheduleYears()}
                          months={getScheduleMonths()}
                          days={getScheduleDays()}
                          hours={getScheduleHours()}
                          minutes={getScheduleMinutes()}
                        ></Scheduler>
                      </div>
                    </div>
                  )}
                  {step === option?.steps && (
                    <div>
                      <FieldContainer title={"Título"}>
                        <TextEmoji
                          text={
                            postAttributes.find((x) => x.key === "title")?.value
                          }
                        ></TextEmoji>
                      </FieldContainer>
                      <FieldContainer title={"Descripción"}>
                        <div className="w-full">
                          {
                            postAttributes.find((x) => x.key === "description")
                              ?.value
                          }
                        </div>
                      </FieldContainer>
                      {postAttributes.find((x) => x.key === "postType")
                        ?.value === "survey" && (
                        <FieldContainer title={"Opciones de la Encuesta"}>
                          {
                            postAttributes.find((x) => x.key === "answerType")
                              ?.value.text
                          }
                          <br></br>
                          Permitir al usuario agregar opciones a la encuesta?{" "}
                          {
                            postAttributes.find(
                              (x) => x.key === "allowAddOption"
                            )?.value.text
                          }
                          <br></br>
                          <div className="ml-5">
                            <ul className="block list-disc">
                              {postAttributes
                                .find((x) => x.key === "options")
                                .value.map((option) => {
                                  return (
                                    <li className="w-full" key={option.key}>
                                      {option.text}
                                    </li>
                                  );
                                })}
                            </ul>
                          </div>
                          <br></br>
                          {"Expira en " +
                            postAttributes.find((x) => x.key === "expiresBy")
                              ?.value}
                        </FieldContainer>
                      )}
                      <FieldContainer title={"Visible a:"}>
                        {
                          postAttributes.find((x) => x.key === "scope")?.value
                            .text
                        }
                      </FieldContainer>
                      <FieldContainer title={"Programación:"}>
                        {postAttributes.find((x) => x.key === "schedule")?.value
                          ? `${moment(
                              postAttributes.find((x) => x.key === "schedule")
                                ?.value
                            ).format("DD/MM/YYYY HH:mm")} hrs.`
                          : "Sin programación"}
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
              isScheduled={scheduleEnabled}
              isNextDisabled={isFormValid}
              onPublish={handlePostDataSubmit}
            ></PostActionBar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
