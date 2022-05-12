import React, { useState } from "react";
import { useRouter } from "next/router";
import FieldContainer from "../../../components/common/field-container";
import Select from "../../../components/common/select";
import { useAuth } from "../../../authUserProvider";
import Firebase from "../../../firebase";
import { toast } from "react-toastify";
import { getDownloadURL } from "firebase/storage";

import {
  phoneAreaOptions,
  documentTypeOptions,
  employeeTypeOptions,
  statusOptions,
  genderOptions,
  VALIDATIONS,
} from "../../../utils/UI-Constants";

import RoundedInputText from "../../../components/common/roundedInputText";
import { v4 } from "uuid";
import { XIcon } from "@heroicons/react/solid";

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
  const [images, setImages] = useState([]);
  const [phoneArea, setPhoneArea] = useState(
    phoneAreaOptions.find((x) => x.id === "PE/PER")
  );
  const [documentType, setDocumentType] = useState(documentTypeOptions[0]);

  const [gender, setGender] = useState(genderOptions[0]);
  const [status, setStatus] = useState(statusOptions[0]);
  const [employeeType, setEmployeeType] = useState(employeeTypeOptions[0]);

  const upload = async (employeeId) => {
    const storage = Firebase.default.storage();

    for (let index = 0; index < images.length; index++) {
      const element = images[index];
      const fileURL = `/files/employees/${employeeId}/${element.name}`;
      const refToFile = storage.ref(fileURL);

      const uploadTask = refToFile.put(element);
      await handleEmployeeDocumentsLink(employeeId, fileURL);

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
          console.info("Upload completed");
        }
      );
    }
  };

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

    if (images.length === 0) {
      toast.warning("No se ha seleccionado ningún archivo.");
      return;
    }

    const employeeId = v4();
    await upload(employeeId);
    await handleCompleteRegistration(employeeId);

    toast.success("Empleado creado con éxito.");
    router.push("/app/empleados");

    event.preventDefault();
  };

  const handleEmployeeDocumentsLink = async (employeeId, url) => {
    const db = Firebase.default.firestore();
    const documentId = v4();

    await db
      .collection("Employees_Documents")
      .doc(documentId)
      .set({
        url: url,
        employeeId: employeeId,
        status: "ACTIVE",
        createdOnUTC: new Date().toISOString(),
        updatedOnUTC: new Date().toISOString(),
      });
  };

  const handleCompleteRegistration = async (employeeId) => {
    const db = Firebase.default.firestore();

    await db
      .collection("Employees")
      .doc(employeeId)
      .set({
        fullName: `${firstName} ${lastName}`,
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
        employeeTypeText: employeeType.text,
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
              onClick={handleContinueClicked}
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

export default EmployeeCreatePage;
