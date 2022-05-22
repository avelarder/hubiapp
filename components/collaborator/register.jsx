import React, { useState } from "react";
import FieldContainer from "../common/field-container";
import Select from "../common/select";
import {
  phoneAreaOptions,
  documentTypeOptions,
  collaboratorTypeOptions,
  statusOptions,
  genderOptions,
  getScheduleYears,
  getScheduleMonths,
  getScheduleDays,
} from "../../utils/UI-Constants";
import RoundedInputText from "../common/roundedInputText";
import { XIcon } from "@heroicons/react/solid";

function CollaboratorRegistration({
  title,
  description,
  onContinueClicked,
  formValidatorConfig,
  userProfile,
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
  const [collaboratorType, setEmployeeType] = useState(
    collaboratorTypeOptions[0]
  );

  return (
    <div className="flex items-center h-screen">
      <div className="flex xs:w-2/6"></div>
      <div className="flex flex-col  xs:w-2/6  items-left  align-middle mt-10">
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

          {userProfile === "RESIDENT" && (
            <FieldContainer>
              <RoundedInputText
                validator={formValidatorConfig.email}
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder="Email"
              ></RoundedInputText>
            </FieldContainer>
          )}

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
                  options={collaboratorTypeOptions}
                  selectedOption={collaboratorType}
                  onOptionChanged={setEmployeeType}
                ></Select>
              </div>
            </div>
          </FieldContainer>
          <FieldContainer>
            <span className="font-medium mt-10 text-sm">
              Elige un archivo a subir
            </span>
            <div className="flex justify-start text-white text-md font-bold mt-2 ">
              <div className="flex flex-col">
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="file"
                  onChange={(e) => {
                    const newImageList = [...images, e.target.files[0]];
                    setImages(newImageList);
                    e.target.value = "";
                  }}
                  title="Seleccione una imagen"
                />
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
            <button
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
            </button>
          </div>
        </section>
      </div>
      <div className="flex xs:w-2/6"></div>
    </div>
  );
}

export default CollaboratorRegistration;
