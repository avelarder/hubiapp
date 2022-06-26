// import React, { useState } from "react";
// import "emoji-mart/css/emoji-mart.css";
// import { Picker } from "emoji-mart";
// import Select from "../common/select";
// import { EmojiHappyIcon } from "@heroicons/react/solid";
// import PostActionBar from "./shared/post-action-bar";
// import SurveyBuilder from "./survey-builder";
// import ImageUploader from "./image-uploader";
// import TextEmoji from "../common/textEmoji";
// import TextInput from "../common/textInput";
// import { VALIDATIONS } from "../../utils/UI-Constants";
// import ContextualMenu from "../dashboard/contextualMenu";
// import Scheduler from "./shared/schedule";
// import moment from "moment";
// import {
//   getScheduleHours,
//   getScheduleMinutes,
//   getScheduleYears,
//   getScheduleMonths,
//   getScheduleDays,
// } from "../../utils/UI-Constants";
// import FieldContainer from "../common/field-container";
// import PostTypeScreen from "./post-type-screen";

// function CreatePost({
//   step,
//   onStepChanged,
//   option,
//   onOptionChanged,
//   postOptions,
//   postScopeOptions,
//   postActionBarStatus,
//   onCancel,
//   onConfirm,
//   onPreview,
//   onBack,
// }) {
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [scheduleEnabled, setScheduleEnabled] = useState(false);
//   const [postData, setPostData] = useState({
//     option: option,
//     step: step,
//     data: [],
//   });

//   const [postAttributes, setPostAttributes] = useState([
//     { key: "scope", value: postScopeOptions[0] },
//     { key: "postType", value: "news" },
//     { key: "answerType", value: { id: "SINGLE", text: "Opción Simple" } },
//     { key: "allowAddOptions", value: false },
//   ]);
//   const [showSurvey, setShowSurvey] = useState(false);

//   const [showImageUploader, setShowImageUploader] = useState(false);

//   const addEmoji = (e) => {
//     let emoji = e.native;
//     const textWithEmoji =
//       (postAttributes.find((x) => x.key === "title")?.value ?? "") + emoji;

//     handleTitleChange(textWithEmoji);
//   };

//   const setAttributeValue = (fieldName, value) => {
//     const field = postAttributes.find((x) => x.key === fieldName);
//     if (field) {
//       const index = postAttributes.indexOf(field);
//       postAttributes[index].value = value;
//       setPostAttributes([...postAttributes]);
//     } else {
//       setPostAttributes([
//         ...postAttributes,
//         {
//           key: fieldName,
//           value: value,
//         },
//       ]);
//     }
//   };

//   const handleOptionsChange = (options) => {
//     setAttributeValue("options", options);
//   };
//   const handleExpiresChange = (expiration) => {
//     setAttributeValue("expiresBy", expiration);
//   };
//   const handlePostTypeChange = (postType) => {
//     setAttributeValue("postType", postType);
//   };
//   const handleAnswerTypeChange = (answerType) => {
//     setAttributeValue("answerType", answerType);
//   };

//   const handleScopeChange = (newScope) => {
//     setAttributeValue("scope", newScope);
//   };

//   const handleDescriptionChange = (description) => {
//     setAttributeValue("description", description);
//   };

//   const handleTitleChange = (title) => {
//     setAttributeValue("title", title);
//   };

//   const handlePostDataChange = () => {
//     let isValid = true;

//     const postType = postAttributes.find((x) => x.key === "postType");
//     if (postType.value === "survey") {
//       isValid =
//         isValid &&
//         postAttributes.find((x) => x.key === "answerType")?.value &&
//         postAttributes.find((x) => x.key === "options")?.value.length > 0 &&
//         postAttributes
//           .find((x) => x.key === "options")
//           ?.value.every((x) => x?.text.length > 0) &&
//         VALIDATIONS.DATE_AFTER(
//           postAttributes.find((x) => x.key === "expiresBy")?.value
//         );
//     }
//     isValid = isValid && postAttributes.find((x) => x.key === "title")?.value;

//     if (scheduleEnabled && postAttributes.find((x) => x.key === "schedule")) {
//       isValid =
//         isValid &&
//         VALIDATIONS.DATETIME_AFTER(
//           postAttributes.find((x) => x.key === "schedule")?.value
//         );
//     }

//     if (isValid) {
//       let latestPostData = { ...postData, data: postAttributes };
//       setPostData(latestPostData);
//       onPreview(latestPostData);
//     }
//     setIsFormValid(isValid);
//   };

//   const handlePostDataSubmit = () => {
//     onConfirm(postData);
//   };

//   const handleShowSurvey = () => {
//     const toggleSurvey = !showSurvey;
//     if (toggleSurvey) {
//       handlePostTypeChange("survey");
//       handleAnswerTypeChange({ id: "SINGLE", text: "Opción simple" });
//     } else {
//       handlePostTypeChange("news");
//       handleAnswerTypeChange(null);
//     }
//     setShowSurvey(toggleSurvey);
//   };

//   const handleShowImages = () => {
//     setShowImageUploader(!showImageUploader);
//   };

//   const handleAllowAddOptionChange = (allowAddOption) => {
//     setAttributeValue("allowAddOption", allowAddOption);
//   };

//   const handleScheduleChanged = (schedule) => {
//     const scheduleDate = moment(
//       `${schedule.year}-${schedule.month}-${schedule.day} ${schedule.hour}:${schedule.minute}`,
//       "YYYY-M-D H:m",
//       true
//     );
//     setAttributeValue("schedule", scheduleDate);
//   };

//   return (
//     <div
//       onKeyDownCapture={(e) => {
//         if (e.key === "Escape") onCancel();
//       }}
//     >
//       <div
//         className="fixed z-100 inset-0 overflow-y-auto"
//         aria-labelledby="modal-title"
//         role="dialog"
//         aria-modal="true"
//       >
//         <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//           <div
//             className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
//             aria-hidden="true"
//           ></div>

//           <span
//             className="hidden sm:inline-block sm:align-middle sm:h-screen"
//             aria-hidden="true"
//           >
//             &#8203;
//           </span>

//           <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//             <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//               <div className="sm:flex sm:items-center">
//                 <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
//                   <h3
//                     className="text-3xl leading-6 font-bold text-gray-900 text-center my-2"
//                     id="modal-title"
//                   >
//                     Crear Publicación
//                   </h3>

//                   {/* Step Container */}
//                   {step === 1 && (

//                   )}
//                   {step === 2 && (
//                     <div>
//                       <div className="mt-2 ">
//                         <Select
//                           title={"Tu aviso será visible a:"}
//                           showTitle={true}
//                           options={postScopeOptions}
//                           selectedOption={
//                             postScopeOptions.find(
//                               (x) =>
//                                 x.id ===
//                                 postAttributes.find((x) => x.key === "scope")
//                                   ?.value.id
//                             ) ?? postScopeOptions[0]
//                           }
//                           onOptionChanged={handleScopeChange}
//                         ></Select>
//                       </div>
//                       <div className="mt-2 ">
//                         <span className="block text-sm font-medium text-gray-700">
//                           Título
//                         </span>
//                         <div className="flex items-center">
//                           <div className="relative text-gray-400 focus-within:text-gray-600 w-full ">
//                             <TextInput
//                               className="text-sm text-gray-500 w-full h-10 border-gray-200 rounded-lg pr-10 border-1"
//                               validation={VALIDATIONS.REQUIRED_FREE_TEXT}
//                               invalidText={"Título es requerido"}
//                               aria-multiline={true}
//                               multiple={true}
//                               placeholder="Ingresa el título de tu aviso aquí."
//                               value={
//                                 postAttributes.find((x) => x.key === "title")
//                                   ?.value
//                               }
//                               onChange={handleTitleChange}
//                             ></TextInput>
//                             <span className="absolute inset-y-0 right-0 flex items-center pr-2">
//                               <ContextualMenu
//                                 className="relative inline-flex"
//                                 icon={
//                                   <EmojiHappyIcon
//                                     width={20}
//                                     height={20}
//                                   ></EmojiHappyIcon>
//                                 }
//                               >
//                                 <li>
//                                   <Picker onSelect={addEmoji} />
//                                 </li>
//                               </ContextualMenu>
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="mt-2 ">
//                         <span className="block text-sm font-medium text-gray-700">
//                           Descripción
//                         </span>
//                         <TextInput
//                           className="text-sm text-gray-500 w-full h-10 border-gray-200 rounded-lg border-1"
//                           rows={5}
//                           minRows={3}
//                           maxRows={10}
//                           placeholder="Ingresa la descripción de tu aviso aquí."
//                           value={
//                             postAttributes.find((x) => x.key === "description")
//                               ?.value
//                           }
//                           onChange={handleDescriptionChange}
//                         ></TextInput>
//                       </div>
//                       <div className="mt-2 flex border-1 rounded-md p-3 text-sm items-center h-16 ">
//                         <span className="flex flex-1">
//                           Agrega a tu publicación
//                         </span>
//                         {/* Survey */}
//                         <div
//                           className="flex m-2 items-center justify-center cursor-pointer"
//                           onClick={handleShowSurvey}
//                         >
//                           <svg
//                             width="28"
//                             height="28"
//                             viewBox="0 0 30 40"
//                             fill={showSurvey ? "rgb(124, 58, 237)" : "#604D4D"}
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path d="M5.66666 12.3333H17.3333V15.6667H5.66666V12.3333ZM5.66666 5.66667H23.95V9H5.66666V5.66667ZM5.66666 19H27.3333V22.3333H5.66666V19ZM0.666664 0.666672H4V27.3333H0.666664V0.666672Z" />
//                           </svg>
//                         </div>
//                         {/* Images */}
//                         <div
//                           className="flex m-2 items-center justify-center cursor-pointer"
//                           onClick={handleShowImages}
//                         >
//                           <svg
//                             width="30"
//                             height="30"
//                             viewBox="0 0 30 40"
//                             fill={showSurvey ? "rgb(124, 58, 237)" : "#604D4D"}
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path d="M26.6667 0H3.33333C1.495 0 0 1.495 0 3.33333V26.6667C0 28.505 1.495 30 3.33333 30H26.6667C28.505 30 30 28.505 30 26.6667V3.33333C30 1.495 28.505 0 26.6667 0ZM3.33333 26.6667V3.33333H26.6667L26.67 26.6667H3.33333Z" />
//                             <path d="M11.6667 18.3333L10 16.6667L5 23.3333H25L16.6667 11.6667L11.6667 18.3333Z" />
//                           </svg>
//                         </div>
//                         {/* Video */}
//                         <div className="flex m-2 items-center justify-center">
//                           <svg
//                             width="30"
//                             height="30"
//                             viewBox="0 0 30 35"
//                             fill={showSurvey ? "rgb(124, 58, 237)" : "#604D4D"}
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path d="M27 3.66666C27 1.82833 25.505 0.333328 23.6667 0.333328H3.66666C1.82833 0.333328 0.333328 1.82833 0.333328 3.66666V20.3333C0.333328 22.1717 1.82833 23.6667 3.66666 23.6667H23.6667C25.505 23.6667 27 22.1717 27 20.3333V14.7783L33.6667 20.3333V3.66666L27 9.22166V3.66666ZM23.67 20.3333H3.66666V3.66666H23.6667L23.6683 11.9983L23.6667 12L23.6683 12.0017L23.67 20.3333Z" />
//                           </svg>
//                         </div>
//                         {/* Files */}
//                         <div className="flex m-2 items-center justify-center">
//                           <svg
//                             width="25"
//                             height="25"
//                             viewBox="0 0 30 40"
//                             fill={showSurvey ? "rgb(124, 58, 237)" : "#604D4D"}
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path d="M27.1717 11.31C27.0926 11.1291 26.982 10.9637 26.845 10.8217L16.845 0.821662C16.7029 0.684632 16.5375 0.574014 16.3567 0.494995C16.3067 0.471661 16.2533 0.458328 16.2 0.439995C16.0605 0.392539 15.9154 0.363952 15.7683 0.354995C15.7333 0.351662 15.7017 0.333328 15.6667 0.333328H3.99999C2.16166 0.333328 0.666656 1.82833 0.666656 3.66666V30.3333C0.666656 32.1717 2.16166 33.6667 3.99999 33.6667H24C25.8383 33.6667 27.3333 32.1717 27.3333 30.3333V12C27.3333 11.965 27.315 11.9333 27.3117 11.8967C27.3035 11.7495 27.2749 11.6042 27.2267 11.465C27.21 11.4117 27.195 11.36 27.1717 11.31ZM21.6433 10.3333H17.3333V6.02333L21.6433 10.3333ZM3.99999 30.3333V3.66666H14V12C14 12.442 14.1756 12.8659 14.4881 13.1785C14.8007 13.4911 15.2246 13.6667 15.6667 13.6667H24L24.0033 30.3333H3.99999Z" />
//                             <path d="M7.33334 17H20.6667V20.3333H7.33334V17ZM7.33334 23.6667H20.6667V27H7.33334V23.6667ZM7.33334 10.3333H10.6667V13.6667H7.33334V10.3333Z" />
//                           </svg>
//                         </div>
//                       </div>
//                       <div className="mt-2 ">
//                         {showImageUploader && <ImageUploader></ImageUploader>}
//                       </div>
//                       <div className="mt-2 ">
//                         {showSurvey && (
//                           <SurveyBuilder
//                             answerType={
//                               postAttributes.find((x) => x.key === "answerType")
//                                 ?.value
//                             }
//                             allowAddOption={
//                               postAttributes.find(
//                                 (x) => x.key === "allowAddOption"
//                               )?.value
//                             }
//                             expirationDate={
//                               postAttributes.find((x) => x.key === "expiresBy")
//                                 ?.value
//                             }
//                             options={
//                               postAttributes.find((x) => x.key === "options")
//                                 ?.value ?? []
//                             }
//                             onAnswerTypeChanged={handleAnswerTypeChange}
//                             onExpirationChanged={handleExpiresChange}
//                             onOptionChanged={handleOptionsChange}
//                             onAddOptionChanged={handleAllowAddOptionChange}
//                           ></SurveyBuilder>
//                         )}
//                       </div>
//                       <div className="mt-2">
//                         <Scheduler
//                           enabled={scheduleEnabled}
//                           setEnabled={setScheduleEnabled}
//                           schedule={
//                             postAttributes.find((x) => x.key === "schedule")
//                               ? moment(
//                                   postAttributes.find(
//                                     (x) => x.key === "schedule"
//                                   )?.value,
//                                   true
//                                 )
//                               : moment(new Date(), true)
//                           }
//                           onScheduleChanged={handleScheduleChanged}
//                           years={getScheduleYears()}
//                           months={getScheduleMonths()}
//                           days={getScheduleDays()}
//                           hours={getScheduleHours()}
//                           minutes={getScheduleMinutes()}
//                         ></Scheduler>
//                       </div>
//                     </div>
//                   )}
//                   {step === option?.steps && (
//                     <div>
//                       <FieldContainer title={"Título"}>
//                         <TextEmoji
//                           text={
//                             postAttributes.find((x) => x.key === "title")?.value
//                           }
//                         ></TextEmoji>
//                       </FieldContainer>
//                       <FieldContainer title={"Descripción"}>
//                         <div className="w-full">
//                           {
//                             postAttributes.find((x) => x.key === "description")
//                               ?.value
//                           }
//                         </div>
//                       </FieldContainer>
//                       {postAttributes.find((x) => x.key === "postType")
//                         ?.value === "survey" && (
//                         <FieldContainer title={"Opciones de la Encuesta"}>
//                           {
//                             postAttributes.find((x) => x.key === "answerType")
//                               ?.value.text
//                           }
//                           <br></br>
//                           Permitir al usuario agregar opciones a la encuesta?{" "}
//                           {
//                             postAttributes.find(
//                               (x) => x.key === "allowAddOption"
//                             )?.value.text
//                           }
//                           <br></br>
//                           <div className="ml-5">
//                             <ul className="block list-disc">
//                               {postAttributes
//                                 .find((x) => x.key === "options")
//                                 .value.map((option) => {
//                                   return (
//                                     <li className="w-full" key={option.key}>
//                                       {option.text}
//                                     </li>
//                                   );
//                                 })}
//                             </ul>
//                           </div>
//                           <br></br>
//                           {"Expira en " +
//                             postAttributes.find((x) => x.key === "expiresBy")
//                               ?.value}
//                         </FieldContainer>
//                       )}
//                       <FieldContainer title={"Visible a:"}>
//                         {
//                           postAttributes.find((x) => x.key === "scope")?.value
//                             .text
//                         }
//                       </FieldContainer>
//                       <FieldContainer title={"Programación:"}>
//                         {postAttributes.find((x) => x.key === "schedule")?.value
//                           ? `${moment(
//                               postAttributes.find((x) => x.key === "schedule")
//                                 ?.value
//                             ).format("DD/MM/YYYY HH:mm")} hrs.`
//                           : "Sin programación"}
//                       </FieldContainer>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <PostActionBar
//               state={postActionBarStatus}
//               onCancel={onCancel}
//               onNext={handlePostDataChange}
//               onBack={onBack}
//               isScheduled={scheduleEnabled}
//               isNextDisabled={isFormValid}
//               onPublish={handlePostDataSubmit}
//             ></PostActionBar>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreatePost;
