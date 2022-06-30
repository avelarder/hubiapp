import React, { useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import Select from "../common/select";
import { EmojiHappyIcon } from "@heroicons/react/solid";
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
import PostTypeScreen from "./post-type-screen";
import { XCircleIcon } from "@heroicons/react/solid";

function CreatePost({ onCancel, children }) {
  // const [isFormValid, setIsFormValid] = useState(false);
  // const [scheduleEnabled, setScheduleEnabled] = useState(false);
  // const [postData, setPostData] = useState({
  //   option: "",
  //   data: [],
  // });

  // const [postAttributes, setPostAttributes] = useState([
  //   { key: "scope", value: postScopeOptions[0] },
  //   { key: "postType", value: "news" },
  //   { key: "answerType", value: { id: "SINGLE", text: "Opción Simple" } },
  //   { key: "allowAddOptions", value: false },
  // ]);
  // const [showSurvey, setShowSurvey] = useState(false);

  // const [showImageUploader, setShowImageUploader] = useState(false);

  // const addEmoji = (e) => {
  //   let emoji = e.native;
  //   const textWithEmoji =
  //     (postAttributes.find((x) => x.key === "title")?.value ?? "") + emoji;

  //   handleTitleChange(textWithEmoji);
  // };

  // const setAttributeValue = (fieldName, value) => {
  //   const field = postAttributes.find((x) => x.key === fieldName);
  //   if (field) {
  //     const index = postAttributes.indexOf(field);
  //     postAttributes[index].value = value;
  //     setPostAttributes([...postAttributes]);
  //   } else {
  //     setPostAttributes([
  //       ...postAttributes,
  //       {
  //         key: fieldName,
  //         value: value,
  //       },
  //     ]);
  //   }
  // };

  // const handleOptionsChange = (options) => {
  //   setAttributeValue("options", options);
  // };
  // const handleExpiresChange = (expiration) => {
  //   setAttributeValue("expiresBy", expiration);
  // };
  // const handlePostTypeChange = (postType) => {
  //   setAttributeValue("postType", postType);
  // };
  // const handleAnswerTypeChange = (answerType) => {
  //   setAttributeValue("answerType", answerType);
  // };

  // const handleScopeChange = (newScope) => {
  //   setAttributeValue("scope", newScope);
  // };

  // const handleDescriptionChange = (description) => {
  //   setAttributeValue("description", description);
  // };

  // const handleTitleChange = (title) => {
  //   setAttributeValue("title", title);
  // };

  // const handlePostDataChange = () => {
  //   let isValid = true;

  //   const postType = postAttributes.find((x) => x.key === "postType");
  //   if (postType.value === "survey") {
  //     isValid =
  //       isValid &&
  //       postAttributes.find((x) => x.key === "answerType")?.value &&
  //       postAttributes.find((x) => x.key === "options")?.value.length > 0 &&
  //       postAttributes
  //         .find((x) => x.key === "options")
  //         ?.value.every((x) => x?.text.length > 0) &&
  //       VALIDATIONS.DATE_AFTER(
  //         postAttributes.find((x) => x.key === "expiresBy")?.value
  //       );
  //   }
  //   isValid = isValid && postAttributes.find((x) => x.key === "title")?.value;

  //   if (scheduleEnabled && postAttributes.find((x) => x.key === "schedule")) {
  //     isValid =
  //       isValid &&
  //       VALIDATIONS.DATETIME_AFTER(
  //         postAttributes.find((x) => x.key === "schedule")?.value
  //       );
  //   }

  //   if (isValid) {
  //     let latestPostData = { ...postData, data: postAttributes };
  //     setPostData(latestPostData);
  //     onPreview(latestPostData);
  //   }
  //   setIsFormValid(isValid);
  // };

  // const handlePostDataSubmit = () => {
  //   onConfirm(postData);
  // };

  // const handleShowSurvey = () => {
  //   const toggleSurvey = !showSurvey;
  //   if (toggleSurvey) {
  //     handlePostTypeChange("survey");
  //     handleAnswerTypeChange({ id: "SINGLE", text: "Opción simple" });
  //   } else {
  //     handlePostTypeChange("news");
  //     handleAnswerTypeChange(null);
  //   }
  //   setShowSurvey(toggleSurvey);
  // };

  // const handleShowImages = () => {
  //   setShowImageUploader(!showImageUploader);
  // };

  // const handleAllowAddOptionChange = (allowAddOption) => {
  //   setAttributeValue("allowAddOption", allowAddOption);
  // };

  // const handleScheduleChanged = (schedule) => {
  //   const scheduleDate = moment(
  //     `${schedule.year}-${schedule.month}-${schedule.day} ${schedule.hour}:${schedule.minute}`,
  //     "YYYY-M-D H:m",
  //     true
  //   );
  //   setAttributeValue("schedule", scheduleDate);
  // };

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
                <div className="mt-3 text-center sm:mt-0  sm:text-left w-full">
                  <div className="flex w-full">
                    <div className="flex flex-1 justify-center">
                      <h3
                        className="text-2xl leading-6 font-bold text-gray-900 text-center my-3"
                        id="modal-title"
                      >
                        Crear Publicación
                      </h3>
                    </div>
                    <div className="flex ">
                      <XCircleIcon
                        className="w-8 h-8 cursor-pointer"
                        onClick={onCancel}
                      ></XCircleIcon>
                    </div>
                  </div>
                  {children}
                  <div className="h-6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
