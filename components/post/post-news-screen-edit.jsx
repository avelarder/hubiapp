import {
  CalendarIcon,
  ChartSquareBarIcon,
  DocumentTextIcon,
  PhotographIcon,
  VideoCameraIcon,
  XIcon,
} from "@heroicons/react/outline";
import classNames from "classnames";
import moment from "moment";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import {
  getScheduleDays,
  getScheduleHours,
  getScheduleMinutes,
  getScheduleMonths,
  getScheduleYears,
  VALIDATIONS,
} from "../../utils/UI-Constants";
import {
  StyledButton,
  StyledSecondaryButton,
} from "../admin/base-ui-components";
import FileUpload from "../common/file-upload";
import TextInput from "../common/textInput";
import Scheduler from "./shared/schedule";
import SurveyBuilder from "./survey-builder";
import Firebase from "../../firebase";
import { toast } from "react-toastify";
import { useAuth } from "../../authUserProvider";
import Chip from "../common/chip";
import Thumbnail from "../common/thumbnail";

export default function PostNewsScreenEdit({
  post,
  documents,
  itemsForDeletion,
  onRemoveDocument,
  onCancel,
}) {
  const { authUser } = useAuth();

  const [isFormValid, setIsFormValid] = useState(true);
  const [description, setDescription] = useState(post.description);
  const [schedule, setSchedule] = useState(moment(post.schedule, true));
  const [showSurvey, setShowSurvey] = useState(post.hasSurvey);
  const [showScheduler, setShowScheduler] = useState(post.hasSchedule);
  const [showImages, setShowImages] = useState(documents.length > 0);
  const [answerType, setAnswerType] = useState(post.surveyAnswerType);
  const [allowAddOption, setAllowAddOption] = useState(
    post.surveyAllowAddOption
  );
  const [options, setOptions] = useState(post.surveyOptions);
  const [expirationDate, setExpirationDate] = useState(post.surveyExpiration);

  const [images, setImages] = useState([]);

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleShowSurvey = () => {
    setShowSurvey((prev) => !prev);
  };
  const handleShowImages = () => {
    setShowImages((prev) => !prev);
  };

  const handleSumitPostNews = async () => {
    const db = Firebase.default.firestore();
    const postId = post.id;
    await db
      .collection("Publications")
      .doc(postId)
      .update({
        description: description,
        hasSurvey: showSurvey,
        ...(showSurvey && { surveyOptions: options }),
        ...(showSurvey && { surveyExpiration: expirationDate }),
        ...(showSurvey && { surveyAnswerType: answerType }),
        ...(showSurvey && { surveyAllowAddOption: allowAddOption }),
        hasSchedule: showScheduler,
        ...(showScheduler && { schedule: schedule.toISOString() }),
        author: {
          id: authUser.uid,
          email: authUser.email,
        },
        location: {
          id: authUser.profiles[0].locationId,
          name: authUser.profiles[0].location,
        },
        createdOnUTC: new Date().toISOString(),
        updatedOnUTC: new Date().toISOString(),
      });

    if (images.length > 0) await upload(postId);
    if (itemsForDeletion.length > 0) await deleteImages();

    toast.success("Tu publicación ha sido actualizada exitosamente.");
    onCancel();
  };

  const deleteImages = async () => {
    const db = Firebase.default.firestore();
    for (let index = 0; index < itemsForDeletion.length; index++) {
      const element = itemsForDeletion[index];

      await db.collection("Publication_Documents").doc(element).delete();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFormStatus = () => {
    const isDescriptionValid = VALIDATIONS.NONE(description);
    const isSurveyValid =
      showSurvey &&
      options.every((x) => VALIDATIONS.NONE(x.text)) &&
      VALIDATIONS.NONE(expirationDate) &&
      VALIDATIONS.DATE(expirationDate);

    const isScheduleValid = showScheduler && schedule;

    return (
      isDescriptionValid &&
      (showSurvey ? isSurveyValid : true) &&
      (showScheduler ? isScheduleValid : true)
    );
  };

  const handleRemoveImage = (index) => {
    setImages([...images.filter((x, i) => i != index)]);
  };

  const handleScheduleChanged = (schedule) => {
    const scheduleDate = moment(
      `${schedule.year}-${schedule.month}-${schedule.day} ${schedule.hour}:${schedule.minute}`,
      "YYYY-M-D H:m",
      true
    );
    setSchedule(scheduleDate);
  };
  const handlePostImage = async (postId, url) => {
    const db = Firebase.default.firestore();
    const documentId = v4();

    await db
      .collection("Publication_Documents")
      .doc(documentId)
      .set({
        url: `${url}`,
        postId: `${postId}`,
        status: "ACTIVE",

        createdOnUTC: new Date().toISOString(),
        updatedOnUTC: new Date().toISOString(),
      });
  };

  const upload = async (postId) => {
    const storage = Firebase.default.storage();

    for (let index = 0; index < images.length; index++) {
      const element = images[index];
      const fileURL = `/files/posts/${postId}/${element.name}`;
      const refToFile = storage.ref(fileURL);

      const uploadTask = refToFile.put(element);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.info("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.info("Upload is paused");
              break;
            case "running":
              console.info("Upload is running");
              break;
          }
        },
        (error) => {
          console.error(error);
        },
        async () => {
          // Handle successful uploads on complete
          await handlePostImage(postId, fileURL);
        }
      );
    }
  };

  useEffect(() => {
    setIsFormValid(handleFormStatus());
  }, [handleFormStatus]);

  if (!authUser)
    return (
      <div className="flex flex-col w-full">
        Cargando información del usuario
      </div>
    );

  return (
    <div className="flex flex-col w-full">
      {/* Photo and User */}
      <div className="flex items-center ">
        <Image
          className="w-6 h-6 rounded-full"
          src="/sample-profile.jpg"
          width="32"
          height="32"
          alt="User"
        />

        <span className="flex ml-4 text-sm">Oscar Velarde</span>
      </div>

      {/* Content */}
      <div className="flex flex-col mt-2 ">
        <TextInput
          rows={5}
          minRows={3}
          maxRows={10}
          placeholder="Hola, ingresa el detalle de tu publicación aquí...."
          value={description}
          invalidText="Ingresa una descripción"
          onChange={handleDescriptionChange}
          validation={VALIDATIONS.NONE}
        ></TextInput>
        <div className="flex items-center border-1 h-14 rounded-lg border-gray-300">
          <span className="flex flex-1 ml-4 text-xs font-bold text-gray-700 ">
            Agregar a tu publicación
          </span>
          <div className="flex items-center">
            {/* Survey */}
            <div
              className={`flex m-2 items-center  w-6 h-6  justify-center cursor-pointer  ${
                showSurvey ? "text-purple-500" : "text-gray-500"
              }`}
              onClick={handleShowSurvey}
            >
              <ChartSquareBarIcon></ChartSquareBarIcon>
            </div>
            {/* Images */}
            {!showSurvey && (
              <>
                <div
                  className={`flex m-2 items-center  w-6 h-6  justify-center cursor-pointer  ${
                    showImages ? "text-purple-500" : "text-gray-500"
                  }`}
                  onClick={handleShowImages}
                >
                  <PhotographIcon></PhotographIcon>
                </div>
                {/* Video */}
                <div
                  className="flex m-2 items-center  w-6 h-6  justify-center cursor-pointer text-gray-500  "
                  onClick={handleShowImages}
                >
                  <VideoCameraIcon></VideoCameraIcon>
                </div>
              </>
            )}
            {/* Files */}
            <div
              className="flex m-2 items-center  w-6 h-6  justify-center cursor-pointer text-gray-500 "
              onClick={handleShowImages}
            >
              <DocumentTextIcon></DocumentTextIcon>
            </div>
          </div>
        </div>
      </div>
      {showSurvey && (
        <div className="flex items-center border-1 my-2  rounded-lg border-gray-300">
          <SurveyBuilder
            answerType={answerType}
            allowAddOption={allowAddOption}
            expirationDate={expirationDate}
            options={options}
            onAnswerTypeChanged={setAnswerType}
            onExpirationChanged={setExpirationDate}
            onOptionChanged={(updatedOptions) => {
              setOptions((prev) => [...updatedOptions]);
              handleFormStatus();
            }}
            onAddOptionChanged={setAllowAddOption}
          ></SurveyBuilder>
        </div>
      )}
      {showImages && (
        <div className="flex w-full flex-col">
          <div className="flex items-center border-1 my-2  rounded-lg border-gray-300">
            <FileUpload
              onFileSelected={(file) => {
                const newImageList = [...images, file];
                setImages(newImageList);
              }}
            ></FileUpload>
          </div>
          <div>
            {images.length === 0 ? (
              <span className="text-black">0 archivos.</span>
            ) : (
              <div className="flex flex-wrap mt-4  w-full">
                {images.map((image, index) => (
                  <Chip
                    key={index}
                    text={image.name}
                    index={index}
                    onRemoveChip={handleRemoveImage}
                  ></Chip>
                ))}
              </div>
            )}
          </div>
          <div>
            {documents.filter(
              (x) =>
                itemsForDeletion.length === 0 ||
                !itemsForDeletion.includes(x.id)
            ) && (
              <div className="flex flex-wrap mt-4  w-full">
                {documents
                  .filter(
                    (x) =>
                      itemsForDeletion.length === 0 ||
                      !itemsForDeletion.includes(x.id)
                  )
                  .map((doc) => (
                    <Thumbnail
                      isActionable={true}
                      imagePath={doc.url}
                      key={doc.id}
                      onRemove={onRemoveDocument}
                      sourceId={doc.id}
                    ></Thumbnail>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
      <Scheduler
        showSwith={false}
        enabled={showScheduler}
        setEnabled={setShowScheduler}
        schedule={schedule}
        onScheduleChanged={handleScheduleChanged}
        years={getScheduleYears()}
        months={getScheduleMonths()}
        days={getScheduleDays()}
        hours={getScheduleHours()}
        minutes={getScheduleMinutes()}
      ></Scheduler>
      {/* Navigation */}
      <div className="flex w-full">
        <StyledButton
          className="flex w-20 justify-center items-center"
          onClick={() => setShowScheduler((prev) => !prev)}
        >
          <CalendarIcon className="w-7 h-7"></CalendarIcon>
        </StyledButton>
        <div className="w-2"></div>
        <StyledButton
          className={classNames("flex flex-1 justify-center items-center", {
            "text-purple-400": !isFormValid,
          })}
          disabled={!isFormValid}
          onClick={handleSumitPostNews}
        >
          Actualizar
        </StyledButton>
      </div>
      <div className="flex h-1"></div>
    </div>
  );
}
