import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import FieldContainer from "../common/field-container";
import Select from "../common/select";
import {
  phoneAreaOptions,
  documentTypeOptions,
  statusOptions,
  genderOptions,
  getScheduleYears,
  getScheduleMonths,
  getScheduleDays,
} from "../../utils/UI-Constants";
import RoundedInputText from "../common/roundedInputText";
import { XIcon } from "@heroicons/react/solid";
import {
  StyledButton,
  StyledSecondaryButton,
} from "../admin/base-ui-components";
import FileUpload from "../common/file-upload";

function CollaboratorRegistration({
  title,
  description,
  onContinueClicked,
  formValidatorConfig,
  collaboratorOptions,
}) {
  const days = getScheduleDays();
  const months = getScheduleMonths();
  const years = getScheduleYears(1900, new Date().getFullYear() - 18);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [images, setImages] = useState([]);
  const [phoneArea, setPhoneArea] = useState(
    phoneAreaOptions.find((x) => x.id === "PE/PER")
  );
  const [documentType, setDocumentType] = useState(documentTypeOptions[0]);
  const [dobDay, setDobDay] = useState(days[0]);
  const [dobMonth, setDobMonth] = useState(months[0]);
  const [dobYear, setDobYear] = useState(years[years.length - 1]);
  const [gender, setGender] = useState(genderOptions[0]);
  const [status, setStatus] = useState(statusOptions[0]);
  const [collaboratorType, setEmployeeType] = useState(collaboratorOptions[0]);

  const defaultButton = useRef(null);
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <section className="">
        <h1 className="text-gray-900 text-3xl font-bold text-center">
          {title}
        </h1>
        <h3 className="text-gray-900 text-center">{description}</h3>
      </section>
      <section className="mt-10">
        <h3 className="font-bold">Información Personal</h3>
      </section>
      <section>
        <div className="flex items-center ">
          <div className="w-2/4">
            <FieldContainer>
              <RoundedInputText
                validator={formValidatorConfig.firstName}
                value={firstName}
                onChange={(e) => setFirstName(e.currentTarget.value)}
                placeholder="Nombres"
              ></RoundedInputText>
            </FieldContainer>
          </div>
          <div className="w-2/4 ml-2">
            <FieldContainer>
              <RoundedInputText
                validator={formValidatorConfig.lastName}
                value={lastName}
                onChange={(e) => setLastName(e.currentTarget.value)}
                placeholder="Apellidos"
              ></RoundedInputText>
            </FieldContainer>
          </div>
        </div>
        <FieldContainer>
          <div className="flex items-center ">
            <div className="w-2/4">
              <Select
                options={documentTypeOptions}
                selectedOption={documentType}
                onOptionChanged={setDocumentType}
              ></Select>
            </div>
            <div className="w-2/4 ml-2">
              <RoundedInputText
                validator={formValidatorConfig.documentId}
                value={documentId}
                onChange={(e) => setDocumentId(e.currentTarget.value)}
                placeholder="Documento de Identidad"
              ></RoundedInputText>
            </div>
          </div>
        </FieldContainer>
        <FieldContainer>
          <div className="flex items-center ">
            <div className="w-2/4">
              <Select
                options={phoneAreaOptions}
                selectedOption={phoneArea}
                onOptionChanged={setPhoneArea}
              ></Select>
            </div>
            <div className="w-2/4 ml-2">
              <RoundedInputText
                validator={formValidatorConfig.phone}
                value={phone}
                onChange={(e) => setPhone(e.currentTarget.value)}
                placeholder="Teléfono Móvil"
              ></RoundedInputText>
            </div>
          </div>
        </FieldContainer>

        <FieldContainer>
          <RoundedInputText
            validator={formValidatorConfig.email}
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Email"
          ></RoundedInputText>
        </FieldContainer>

        <section className="mt-4">
          <h3 className="font-bold text-xs">Fecha de Nacimiento</h3>
        </section>
        <FieldContainer>
          <div className="flex flex-wrap">
            <div className="flex flex-col w-40 mr-2">
              <Select
                options={months}
                selectedOption={dobMonth}
                onOptionChanged={setDobMonth}
              ></Select>
            </div>
            <div className="flex flex-col w-24 mr-2">
              <Select
                options={days}
                selectedOption={dobDay}
                onOptionChanged={setDobDay}
              ></Select>
            </div>
            <div className="flex flex-col w-32">
              <Select
                options={years}
                selectedOption={dobYear}
                onOptionChanged={setDobYear}
              ></Select>
            </div>
          </div>
        </FieldContainer>
        <section className="mt-4">
          <h3 className="font-bold text-xs">Dirección</h3>
        </section>
        <FieldContainer>
          <RoundedInputText
            validator={formValidatorConfig.address}
            value={address}
            onChange={(e) => setAddress(e.currentTarget.value)}
            placeholder="Address"
          ></RoundedInputText>
        </FieldContainer>
        <section className="mt-4">
          <h3 className="font-bold text-xs">Género, Estado Civil y Rol</h3>
        </section>
        <FieldContainer>
          <div className="flex flex-wrap">
            <div className="flex md:flex-col w-2/6">
              <Select
                showTitle={true}
                options={genderOptions}
                selectedOption={gender}
                onOptionChanged={setGender}
              ></Select>
            </div>
            <div className="flex md:flex-col w-2/6">
              <Select
                showTitle={true}
                options={statusOptions}
                selectedOption={status}
                onOptionChanged={setStatus}
              ></Select>
            </div>
            <div className="flex md:flex-col w-2/6">
              <Select
                showTitle={true}
                options={collaboratorOptions}
                selectedOption={collaboratorType}
                onOptionChanged={setEmployeeType}
              ></Select>
            </div>
          </div>
        </FieldContainer>
        <FieldContainer>
          <div className="flex justify-start text-white text-md font-bold mt-2 w-full ">
            <div className="flex flex-col mt-4 w-full">
              <FileUpload
                onFileSelected={(file) => {
                  const newImageList = [...images, file];
                  setImages(newImageList);
                }}
              ></FileUpload>

              {images.length === 0 ? (
                <span className="text-black">0 archivos.</span>
              ) : (
                <ul className="flex flex-col mt-4 list-disc w-full">
                  {images.map((image, index) => (
                    <li
                      className="flex  text-black text-sm justify-between"
                      key={index}
                    >
                      <span className="w-ful uppercase">{image.name}</span>
                      <XIcon className="flex w-5 h-5 cursor-pointer hover:text-red-500"></XIcon>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </FieldContainer>
        <div className="flex justify-end text-white text-md font-bold  mt-8 ">
          <StyledSecondaryButton
            ref={defaultButton}
            className="w-32 bg-gray-400  h-300 shadow-md rounded-md mr-5"
            onClick={() => router.back()}
          >
            Regresar
          </StyledSecondaryButton>
          <StyledButton
            className="w-64 bg-purple-600 h-10 shadow-md rounded-md"
            onClick={(e) =>
              onContinueClicked(e, {
                firstName,
                lastName,
                email,
                documentType,
                documentId,
                phoneArea,
                phone,
                dobDay,
                dobMonth,
                dobYear,
                address,
                gender,
                status,
                collaboratorType,
                images,
              })
            }
          >
            Crear
          </StyledButton>
        </div>
      </section>
    </div>
  );
}

export default CollaboratorRegistration;
