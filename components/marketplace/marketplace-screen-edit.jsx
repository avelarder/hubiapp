import Image from "next/image";
import { useEffect, useState } from "react";
import {
  operationTypeOptions,
  operationStatusOptions,
  operationPrivacyOptions,
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
  PhoneIcon,
} from "@heroicons/react/outline";
import Firebase from "../../firebase";
import { uuid as v4 } from "uuidv4";

import { toast } from "react-toastify";
import Thumbnail from "../common/thumbnail";

export default function MarketplaceScreenEdit({
  operation,
  documents,
  itemsForDeletion,
  onRemoveDocument,
  onCancel,
}) {
  const [isFormValid, setIsFormValid] = useState(true);
  const [images, setImages] = useState([]);
  const [operationTypeOption, setOperationTypeOption] = useState(
    operation.operationTypeOption
  );
  const [operationStatusOption, setOperationStatusOption] = useState(
    operation.operationStatusOption
  );
  const [operationPrivacyOption, setOperationPrivacyOption] = useState(
    operation.operationPrivacyOption
  );
  const [title, setTitle] = useState(operation.title);
  const [price, setPrice] = useState(operation.price);
  const [description, setDescription] = useState(operation.description);
  const [phone, setPhone] = useState(operation.description);
  const [location, setLocation] = useState(operation.location);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFormStatus = () => {
    const isTitleValid = VALIDATIONS.NONE(title);
    const isDescriptionValid = VALIDATIONS.NONE(description);
    const isPhone = VALIDATIONS.NONE(phone);
    const isPriceValid = VALIDATIONS.ONLY_NUMBERS_GREATHER_THAN_ZERO(price);
    const isLocationValid = VALIDATIONS.NONE(location);
    return (
      isDescriptionValid &&
      isLocationValid &&
      isTitleValid &&
      isPriceValid &&
      isPhone
    );
  };

  const handleOperationImage = async (operationId, url) => {
    const db = Firebase.default.firestore();
    const documentId = v4();

    await db
      .collection("Marketplace_Documents")
      .doc(documentId)
      .set({
        url: `${url}`,
        operationId: `${operationId}`,
        status: "ACTIVE",

        createdOnUTC: new Date().toISOString(),
        updatedOnUTC: new Date().toISOString(),
      });
  };

  const upload = async (postId) => {
    const storage = Firebase.default.storage();

    for (let index = 0; index < images.length; index++) {
      const element = images[index];
      const fileURL = `/files/marketplace/${postId}/${element.name}`;
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
          await handleOperationImage(postId, fileURL);
        }
      );
    }
  };

  const handleSubmitOperation = async () => {
    const db = Firebase.default.firestore();
    const operationId = v4();
    await db.collection("Marketplace").doc(operationId).update({
      description: description,
      title: title.toLocaleString(),
      phone: phone,
      price: price,
      location: location,
      operationTypeOption: operationTypeOption,
      operationStatusOption: operationStatusOption,
      operationPrivacyOption: operationPrivacyOption,
      updatedOnUTC: new Date().toISOString(),
    });

    if (images.length > 0) await upload(operationId);

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
          <div className="flex w-full gap-2">
            <FieldContainer title={"Tipo de Operación"}>
              <Select
                options={operationTypeOptions}
                selectedOption={operationTypeOption}
                onOptionChanged={setOperationTypeOption}
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
                placeholder="Precio"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></RoundedInputText>
            </FieldContainer>
          </div>
          <FieldContainer title={"Titulo"}>
            <RoundedInputText
              validator={{
                validate: (content) => {
                  return VALIDATIONS.NONE(content);
                },
                message: "Ingrese una opción válida",
              }}
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></RoundedInputText>
          </FieldContainer>
          <div className="flex w-full gap-2">
            <FieldContainer title={"Ubicación"}>
              <RoundedInputText
                validator={{
                  validate: (content) => {
                    return VALIDATIONS.NONE(content);
                  },
                  message: "Ingrese una opción válida",
                }}
                placeholder="Teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></RoundedInputText>
            </FieldContainer>
            <FieldContainer>
              <Select
                options={operationStatusOptions}
                selectedOption={operationStatusOption}
                onOptionChanged={setOperationStatusOption}
              ></Select>
            </FieldContainer>
          </div>
          <div className="flex w-full gap-2">
            <FieldContainer title={"Privacidad"}>
              <Select
                options={operationPrivacyOptions}
                selectedOption={operationTypeOption}
                onOptionChanged={setOperationPrivacyOption}
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
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              ></RoundedInputText>
            </FieldContainer>
          </div>
          <FieldContainer title={"Descripción"}>
            <TextInput
              rows={5}
              minRows={3}
              maxRows={10}
              placeholder="Hola, ingresa el detalle de tu publicación aquí...."
              value={description}
              invalidText="Ingresa una descripción"
              onChange={setDescription}
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
            onClick={handleSubmitOperation}
          >
            Actualizar
          </StyledButton>
        </div>
      </div>
      <div className="flex flex-col w-2/3 border-1 border-gray-100 rounded-lg p-4">
        <div className="flex  w-full rounded-lg border-1 border-gray-100 h-2/6 mb-4">
          {documents.filter(
            (x) =>
              itemsForDeletion.length === 0 || !itemsForDeletion.includes(x.id)
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
              ha publicado un nuevo artículo&nbsp;<b>Oscar Velarde</b>
            </span>
          </div>
          <div className="flex justify-end w-full mr-4 items-center">
            <StyledButton className={"w-28"}>Interesado</StyledButton>
            <StyledButton className={"w-28"}>Sin Interés</StyledButton>
          </div>
        </div>
        <div className="flex  w-full rounded-lg border-1 border-purple-200 h-3/6 px-8 py-4">
          <div className="flex flex-col w-2/3">
            <span className="text-2xl font-bold">{title}</span>
            <p className="text-sm">{description} </p>
            <Divider></Divider>
            <p className="flex text-sm w-full items-center">
              <LockClosedIcon className="w-4 h-4 mr-4"></LockClosedIcon>
              {operationPrivacyOption.text}
            </p>
            <p className="flex text-sm w-full items-center">
              <LockClosedIcon className="w-4 h-4 mr-4"></LockClosedIcon>
              {operationStatusOption.text}
            </p>
            <p className="flex text-sm w-full items-center">
              <PhoneIcon className="w-4 h-4 mr-4"></PhoneIcon>
              {phone.text}
            </p>
            <p className="flex text-sm w-full items-center">
              <CalendarIcon className="w-4 h-4 mr-4"></CalendarIcon>
              {operation.createdOnUTC.toLocaleString("es-ES")}
            </p>
            <p className="flex text-sm w-full items-center">
              <LocationMarkerIcon className="w-4 h-4 mr-4"></LocationMarkerIcon>
              {location}
            </p>
          </div>
          <div className="flex flex-col w-1/3 items-center justify-center">
            <div className="flex flex-col justify-center w-20">
              <span className="flex font-bold bg-purple-400 text-white text-center justify-center rounded-t-md items-center">
                {operationTypeOption.text}
              </span>
              <span className="flex text-4xl font-bold text-center justify-center bg-gray-200 h-14 items-center">
                S/.{price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
