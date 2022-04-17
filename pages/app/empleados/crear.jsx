import React, { useState } from "react";
import { useRouter } from "next/router";
import FieldContainer from "../../../components/common/field-container";
import Select from "../../../components/common/select";
import { useAuth } from "../../../authUserProvider";
import Firebase from "../../../firebase";
import { toast } from "react-toastify";

import {
  phoneAreaOptions,
  documentTypeOptions,
  employeeTypeOptions,
  statusOptions,
  genderOptions,
  VALIDATIONS,
} from "../../../utils/UI-Constants";

import RoundedInputText from "../../../components/common/RoundedInputText";
import { uuid } from "uuidv4";

function EmployeeCreatePage() {
  const router = useRouter();
  const { authUser } = useAuth();

  const validatorConfig = {
    firstName: {
      validate: (content) => {
        return VALIDATIONS.REQUIRED_FREE_TEXT(content);
      },
      message: "Nombre es requerido.",
    },
    lastName: {
      validate: (content) => {
        return VALIDATIONS.REQUIRED_FREE_TEXT(content);
      },
      message: "Apellidos son requeridos.",
    },
    phone: {
      validate: (content) => {
        return VALIDATIONS.ONLY_NUMBERS(content);
      },
      message: "El número de celular es requerido.",
    },
    address: {
      validate: (content) => {
        return VALIDATIONS.REQUIRED_FREE_TEXT(content);
      },
      message: "Ingrese dirección.",
    },

    email: {
      validate: (content) => {
        return VALIDATIONS.EMAIL(content);
      },
      message: "Ingrese su correo electrónico.",
    },

    documentId: {
      validate: (content) => {
        return VALIDATIONS.ONLY_NUMBERS(content);
      },
      message: "Reingrese su documento de identidad.",
    },
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [phoneArea, setPhoneArea] = useState(
    phoneAreaOptions.find((x) => x.id === "PE/PER")
  );
  const [documentType, setDocumentType] = useState(documentTypeOptions[0]);

  const [gender, setGender] = useState(genderOptions[0]);
  const [status, setStatus] = useState(statusOptions[0]);
  const [employeeType, setEmployeeType] = useState(employeeTypeOptions[0]);

  const handleContinueClicked = async (event) => {
    if (
      !validatorConfig.firstName.validate(firstName) ||
      !validatorConfig.lastName.validate(lastName) ||
      !validatorConfig.phone.validate(phone) ||
      !validatorConfig.email.validate(email) ||
      !validatorConfig.documentId.validate(documentId) ||
      !validatorConfig.address.validate(address)
    ) {
      toast.warning("Por favor complete el formulario.");
      return;
    }

    await handleCompleteRegistration(authUser.uid, authUser.email);
    toast.success("Empleado creado con éxito.");
    router.push("/app/empleados");

    event.preventDefault();
  };

  const handleCompleteRegistration = async () => {
    const db = Firebase.default.firestore();
    const employeeId = uuid();

    await db
      .collection("Employees")
      .doc(employeeId)
      .set({
        firstName: firstName,
        lastName: lastName,
        phoneArea: phoneArea,
        phone: phone,
        email: email,
        documentType: documentType,
        documentId: documentId,
        address: address,
        gender: gender,
        status: status,
        employeeType: employeeType,
        createdOnUTC: new Date().toISOString(),
        updatedOnUTC: new Date().toISOString(),
      });
  };

  return (
    <div className="flex items-center h-screen">
      <div className="flex xs:w-2/6"></div>
      <div className="flex flex-col  xs:w-2/6  items-left  align-middle mt-10">
        <section className="">
          <h1 className="text-gray-900 text-3xl font-bold text-center mb-10">
            Crear Empleado
          </h1>
          <h3 className="font-bold">Información Personal</h3>
        </section>
        <section>
          <div className="flex items-center ">
            <div className="w-2/4">
              <FieldContainer>
                <RoundedInputText
                  validator={{
                    validate: (content) => {
                      return VALIDATIONS.REQUIRED_FREE_TEXT(content);
                    },
                    message: "Nombre es requerido.",
                  }}
                  value={firstName}
                  onChange={(e) => setFirstName(e.currentTarget.value)}
                  placeholder="Nombres"
                ></RoundedInputText>
              </FieldContainer>
            </div>
            <div className="w-2/4 ml-2">
              <FieldContainer>
                <RoundedInputText
                  validator={{
                    validate: (content) => {
                      return VALIDATIONS.REQUIRED_FREE_TEXT(content);
                    },
                    message: "Apellidos son requeridos.",
                  }}
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
                  options={phoneAreaOptions}
                  selectedOption={phoneArea}
                  onOptionChanged={setPhoneArea}
                ></Select>
              </div>
              <div className="w-2/4 ml-2">
                <RoundedInputText
                  validator={{
                    validate: (content) => {
                      return VALIDATIONS.ONLY_NUMBERS(content);
                    },
                    message: "El número de celular es requerido.",
                  }}
                  value={phone}
                  onChange={(e) => setPhone(e.currentTarget.value)}
                  placeholder="Teléfono Móvil"
                ></RoundedInputText>
              </div>
            </div>
          </FieldContainer>
          <FieldContainer>
            <RoundedInputText
              validator={{
                validate: (content) => {
                  return VALIDATIONS.EMAIL(content);
                },
                message: "Correo electrónico es requerido.",
              }}
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder="Email"
            ></RoundedInputText>
          </FieldContainer>
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
                  validator={{
                    validate: (content) => {
                      return VALIDATIONS.ONLY_NUMBERS(content);
                    },
                    message: "Ingrese documento de identidad.",
                  }}
                  value={documentId}
                  onChange={(e) => setDocumentId(e.currentTarget.value)}
                  placeholder="Documento de Identidad"
                ></RoundedInputText>
              </div>
            </div>
          </FieldContainer>
          <FieldContainer>
            <RoundedInputText
              validator={{
                validate: (content) => {
                  return VALIDATIONS.REQUIRED_FREE_TEXT(content);
                },
                message: "Ingrese dirección.",
              }}
              value={address}
              onChange={(e) => setAddress(e.currentTarget.value)}
              placeholder="Address"
            ></RoundedInputText>
          </FieldContainer>
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
                  options={employeeTypeOptions}
                  selectedOption={employeeType}
                  onOptionChanged={setEmployeeType}
                ></Select>
              </div>
            </div>
          </FieldContainer>
          <FieldContainer>
            <span className="font-medium mt-10 text-sm">
              Elige un archivo a subir
            </span>
            <div className="flex justify-start text-white text-md font-bold  mt-8 ">
              <input
                className="form-control block w-full px-3 py-1.5 text-base     font-normal     text-gray-700      bg-white bg-clip-padding     border border-solid border-gray-300     rounded     transition     ease-in-out     m-0     focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="file"
                onChange={(e) => {
                  console.log(e.currentTarget.value);
                }}
              />
            </div>
          </FieldContainer>
          <div className="flex justify-end text-white text-md font-bold  mt-8 ">
            <button
              className="w-64 bg-purple-600 h-10 shadow-md rounded-md"
              onClick={handleContinueClicked}
            >
              Registrar
            </button>
          </div>
        </section>
      </div>
      <div className="flex xs:w-2/6"></div>
    </div>
  );
}

export default EmployeeCreatePage;
