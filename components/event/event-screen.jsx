import Image from "next/image";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import {
  eventPrivacyOptions,
  monthsInText,
  phoneAreaOptions,
  VALIDATIONS,
} from "../../utils/UI-Constants";
import Chip from "../common/chip";
import FieldContainer from "../common/field-container";
import FileUpload from "../common/file-upload";
import RoundedInputText from "../common/roundedInputText";
import Select from "../common/select";
import TextInput from "../common/textInput";
import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";
import { Divider, StyledButton } from "../admin/base-ui-components";
import {
  CalendarIcon,
  LocationMarkerIcon,
  LockClosedIcon,
} from "@heroicons/react/outline";
import Firebase from "../../firebase";
import { uuid as v4 } from "uuidv4";

import { toast } from "react-toastify";

export default function EventScreen({ onCancel }) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [images, setImages] = useState([]);
  const [eventPrivacyOption, setEventPrivacyOption] = useState(
    eventPrivacyOptions[0]
  );
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFormStatus = () => {
    const isDescriptionValid = VALIDATIONS.NONE(eventDescription);
    const isNameValid = VALIDATIONS.NONE(eventName);
    const isLocationValid = VALIDATIONS.NONE(eventLocation);
    const isStartDateValid = VALIDATIONS.DATE(startDate);
    const isEndDateValid = VALIDATIONS.DATE(endDate);

    return (
      isDescriptionValid &&
      isNameValid &&
      isLocationValid &&
      isStartDateValid &&
      isEndDateValid
    );
  };

  const handlePostImage = async (postId, url) => {
    const db = Firebase.default.firestore();
    const documentId = v4();

    await db
      .collection("Event_Documents")
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
      const fileURL = `/files/events/${postId}/${element.name}`;
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

  const handleSumitEvent = async () => {
    const db = Firebase.default.firestore();
    const eventId = v4();
    await db.collection("Events").doc(eventId).set({
      description: eventDescription,
      startDate: startDate.toLocaleString(),
      endDate: endDate.toLocaleString(),
      eventName: eventName,
      eventLocation: eventLocation,
      eventPrivacy: eventPrivacyOption,
      createdOnUTC: new Date().toISOString(),
      updatedOnUTC: new Date().toISOString(),
    });

    if (images.length > 0) await upload(eventId);

    toast.success("Tu publicación ha sido aceptada.");
    onCancel();
  };

  useEffect(() => {
    setIsFormValid(handleFormStatus());
  }, [handleFormStatus]);

  return (
    <div className="flex gap-8">
      <div className="flex flex-col w-1/3">
        {/* Content */}
        <div className="flex flex-col mt-2 ">
          <FieldContainer title={"Evento"}>
            <RoundedInputText
              validator={{
                validate: (content) => {
                  return VALIDATIONS.NONE(content);
                },
                message: "Ingrese una opción válida",
              }}
              placeholder="Nombre del evento"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            ></RoundedInputText>
          </FieldContainer>
          <div className="flex w-full gap-2">
            <FieldContainer title={"Fecha Inicio"}>
              <ReactDatePicker
                className={classNames(
                  "bg-gradient-to-r from-gray-50 to-white text-xs text-gray-500  w-full h-10 border-grayt-200 rounded-full border-b-1 focus:border-purple-900 pl-6"
                )}
                dateFormat="dd/MM/yyyy hh:mm aa"
                locale="es"
                selected={startDate}
                onChange={setStartDate}
                showTimeSelect
              ></ReactDatePicker>
            </FieldContainer>
          </div>
          <div className="flex w-full gap-2">
            <FieldContainer title={"Fecha de Fin"}>
              <ReactDatePicker
                className={classNames(
                  "bg-gradient-to-r from-gray-50 to-white text-xs text-gray-500  w-full h-10 border-grayt-200 rounded-full border-b-1 focus:border-purple-900 pl-6"
                )}
                dateFormat="dd/MM/yyyy hh:mm aa"
                locale="es"
                selected={endDate}
                onChange={(date) => {
                  console.log(date);
                  setEndDate(date);
                }}
                showTimeSelect
              ></ReactDatePicker>
            </FieldContainer>
          </div>
          <div className="flex w-full gap-2">
            <FieldContainer title={"Privacidad"}>
              <Select
                options={eventPrivacyOptions}
                selectedOption={eventPrivacyOption}
                onOptionChanged={setEventPrivacyOption}
              ></Select>
            </FieldContainer>
            <FieldContainer title={"Ubicación"}>
              <RoundedInputText
                validator={{
                  validate: (content) => {
                    return VALIDATIONS.NONE(content);
                  },
                  message: "Ingrese una opción válida",
                }}
                placeholder="Ubicación"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
              ></RoundedInputText>
            </FieldContainer>
          </div>
          <FieldContainer title={"Descripción"}>
            <TextInput
              rows={5}
              minRows={3}
              maxRows={10}
              placeholder="Hola, ingresa el detalle de tu publicación aquí...."
              value={eventDescription}
              invalidText="Ingresa una descripción"
              onChange={setEventDescription}
              validation={VALIDATIONS.NONE}
            ></TextInput>
          </FieldContainer>
          <FieldContainer>
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
                        onRemoveChip={() => {}}
                      ></Chip>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </FieldContainer>
          <StyledButton
            className={classNames("flex w-full justify-center items-center", {
              "text-purple-400": !isFormValid,
            })}
            disabled={!isFormValid}
            onClick={handleSumitEvent}
          >
            Publicar
          </StyledButton>
        </div>
      </div>
      <div className="flex flex-col w-2/3 border-1 border-gray-100 rounded-lg p-4">
        <div className="flex  w-full rounded-lg border-1 border-gray-100 h-2/6 mb-4"></div>
        <div className="flex  w-full rounded-lg border-1 border-purple-200 h-1/6 mb-4">
          <div className="flex items-center ml-4 w-full">
            <Image
              className="w-6 h-6 rounded-full"
              src="/sample-profile.jpg"
              width="32"
              height="32"
              alt="User"
            />

            <span className="flex ml-4 text-sm">
              te ha invitado&nbsp;<b>Oscar Velarde</b>
            </span>
          </div>
          <div className="flex justify-end w-full mr-4 items-center">
            <StyledButton className={"w-28"}>Asistiré</StyledButton>
            <StyledButton className={"w-28"}>No asistiré</StyledButton>
          </div>
        </div>
        <div className="flex  w-full rounded-lg border-1 border-purple-200 h-3/6 px-8 py-4">
          <div className="flex flex-col w-2/3">
            <span className="text-2xl font-bold">{eventName}</span>
            <p className="text-sm">{eventDescription} </p>
            <Divider></Divider>
            <p className="flex text-sm w-full items-center">
              <LockClosedIcon className="w-4 h-4 mr-4"></LockClosedIcon>
              {eventPrivacyOption.text}
            </p>
            <p className="flex text-sm w-full items-center">
              <CalendarIcon className="w-4 h-4 mr-4"></CalendarIcon>
              {startDate.toLocaleString("es-ES")}
            </p>
            <p className="flex text-sm w-full items-center">
              <CalendarIcon className="w-4 h-4 mr-4"></CalendarIcon>
              {endDate.toLocaleString("es-ES")}
            </p>
            <p className="flex text-sm w-full items-center">
              <LocationMarkerIcon className="w-4 h-4 mr-4"></LocationMarkerIcon>
              {eventLocation}
            </p>
          </div>
          <div className="flex flex-col w-1/3 items-center justify-center">
            <div className="flex flex-col justify-center w-20">
              <span className="flex font-bold bg-purple-400 text-white text-center justify-center rounded-t-md items-center">
                {monthsInText(startDate.getMonth())}
              </span>
              <span className="flex text-4xl font-bold text-center justify-center bg-gray-200 h-14 items-center">
                {startDate.getDate()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
