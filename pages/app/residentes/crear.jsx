import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import FieldContainer from "../../../components/common/field-container";
import Select from "../../../components/common/select";
import { useAuth } from "../../../authUserProvider";
import Firebase from "../../../firebase";
import { toast } from "react-toastify";

import {
  phoneAreaOptions,
  documentTypeOptions,
  residentTypeOptions,
  statusOptions,
  genderOptions,
  VALIDATIONS,
} from "../../../utils/UI-Constants";

import RoundedInputText from "../../../components/common/roundedInputText";
import { v4 } from "uuid";
import { XIcon } from "@heroicons/react/solid";
import Layout from "../../../components/layout";
import { useLocationContext } from "../../../locationProvider";

function ResidentCreatePage() {
  const router = useRouter();
  const { authUser } = useAuth();
  const { locationSelected } = useLocationContext();

  const validatorConfig = {
    numberOfResidents: {
      validate: (content) => {
        return VALIDATIONS.ONLY_NUMBERS_GREATHER_THAN_ZERO(content);
      },
      message: "Especifique un número de residentes válido.",
    },

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

    email: {
      validate: (content) => {
        return VALIDATIONS.EMAIL(content);
      },
      message: "Ingrese su correo electrónico.",
    },

    address: {
      validate: (content) => {
        return VALIDATIONS.REQUIRED_FREE_TEXT(content);
      },
      message: "Ingrese su domicilio de residencia.",
    },

    appartmentNumber: {
      validate: (content) => {
        return VALIDATIONS.ONLY_NUMBERS(content);
      },
      message: "Ingrese su número de apartamento.",
    },

    documentId: {
      validate: (content) => {
        return VALIDATIONS.ONLY_NUMBERS(content);
      },
      message: "Reingrese su documento de identidad.",
    },
  };

  const defaultButton = useRef(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [appartmentNumber, setAppartmentNumber] = useState("");
  const [petCount, setPetCount] = useState({
    id: "SELECT",
    text: "Mascotas?",
  });
  const [numberOfResidents, setNumberOfResidents] = useState("");
  const [parking1, setParking1] = useState("");
  const [parking2, setParking2] = useState("");
  const [numberOfVehicles, setNumberOfVehicles] = useState({
    id: "SELECT",
    text: "Vehículos?",
  });
  const [numberOfParkingSlots, setNumberOfParkingSlots] = useState({
    id: "SELECT",
    text: "Estacionamientos?",
  });
  const [building, setBuilding] = useState({
    id: locationSelected?.buildings[0],
    text: locationSelected?.buildings[0],
  });
  const [images, setImages] = useState([]);
  const [phoneArea, setPhoneArea] = useState(
    phoneAreaOptions.find((x) => x.id === "PE/PER")
  );
  const [documentType, setDocumentType] = useState(documentTypeOptions[0]);

  const [gender, setGender] = useState(genderOptions[0]);
  const [status, setStatus] = useState(statusOptions[0]);
  const [residentType, setResidentType] = useState(residentTypeOptions[0]);

  const upload = async (residentId) => {
    const storage = Firebase.default.storage();

    for (let index = 0; index < images.length; index++) {
      const element = images[index];
      const fileURL = `/files/residents/${residentId}/${element.name}`;
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
          await handleresidentDocumentsLink(residentId, fileURL);
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
      !validatorConfig.documentId.validate(documentId)
    ) {
      toast.warning("Por favor complete el formulario.");
      return;
    }

    if (images.length === 0) {
      toast.warning("No se ha seleccionado ningún archivo.");
      return;
    }

    const residentId = v4();

    await upload(residentId);
    await handleCompleteRegistration(residentId);

    toast.success("Residente creado con éxito.");
    router.push("/app/residentes");

    event.preventDefault();
  };

  const handleresidentDocumentsLink = async (residentId, url) => {
    const db = Firebase.default.firestore();
    const documentId = v4();

    await db
      .collection("Residents_Documents")
      .doc(documentId)
      .set({
        url: `${url}`,
        residentId: `${residentId}`,
        status: "ACTIVE",
        residentTypeText: residentType.text,
        createdOnUTC: new Date().toISOString(),
        updatedOnUTC: new Date().toISOString(),
      });
  };

  const handleCompleteRegistration = async (residentId) => {
    const db = Firebase.default.firestore();

    await db
      .collection("Residents")
      .doc(residentId)
      .set({
        fullName: `${firstName} ${lastName}`,
        firstName: firstName,
        lastName: lastName,
        phoneArea: phoneArea,
        phone: phone,
        email: email,
        documentType: documentType,
        documentId: documentId,

        gender: gender,
        status: status,
        residentType: residentType,
        residentTypeText: residentType.text,
        createdOnUTC: new Date().toISOString(),
        updatedOnUTC: new Date().toISOString(),
      });
  };

  console.log(locationSelected);

  return (
    <Layout>
      <div className="flex items-start h-screen">
        <div className="flex xs:w-1/6"></div>
        <div className="flex flex-col  xs:w-4/6  items-left  align-middle mt-10">
          <section className="">
            <h1 className="text-gray-900 text-3xl font-bold text-center mb-10">
              Crear Residente
            </h1>
            <h3 className="font-bold">Información Personal</h3>
          </section>
          <section>
            <div className="flex items-center ">
              <div className="w-2/4">
                <FieldContainer>
                  <RoundedInputText
                    validator={validatorConfig.firstName}
                    value={firstName}
                    onChange={(e) => setFirstName(e.currentTarget.value)}
                    placeholder="Nombres"
                  ></RoundedInputText>
                </FieldContainer>
              </div>
              <div className="w-2/4 ml-2">
                <FieldContainer>
                  <RoundedInputText
                    validator={validatorConfig.lastName}
                    value={lastName}
                    onChange={(e) => setLastName(e.currentTarget.value)}
                    placeholder="Apellidos"
                  ></RoundedInputText>
                </FieldContainer>
              </div>
            </div>

            <FieldContainer>
              <div className="flex items-center ">
                <div className="w-1/6">
                  <Select
                    options={phoneAreaOptions}
                    selectedOption={phoneArea}
                    onOptionChanged={setPhoneArea}
                  ></Select>
                </div>
                <div className="w-2/6 ml-2">
                  <RoundedInputText
                    validator={validatorConfig.phone}
                    value={phone}
                    onChange={(e) => setPhone(e.currentTarget.value)}
                    placeholder="Teléfono Móvil"
                  ></RoundedInputText>
                </div>
                <div className="w-3/6 ml-2">
                  <RoundedInputText
                    validator={validatorConfig.email}
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    placeholder="Email"
                  ></RoundedInputText>
                </div>
              </div>
            </FieldContainer>
            <FieldContainer>
              <div className="flex items-center ">
                <div className="w-1/6">
                  <Select
                    options={documentTypeOptions}
                    selectedOption={documentType}
                    onOptionChanged={setDocumentType}
                  ></Select>
                </div>
                <div className="w-2/6 ml-2">
                  <RoundedInputText
                    validator={validatorConfig.documentId}
                    value={documentId}
                    onChange={(e) => setDocumentId(e.currentTarget.value)}
                    placeholder="Documento de Identidad"
                  ></RoundedInputText>
                </div>
                <div className="w-3/6 ml-2">
                  <RoundedInputText
                    validator={validatorConfig.address}
                    value={address}
                    onChange={(e) => setAddress(e.currentTarget.value)}
                    placeholder="Dirección"
                  ></RoundedInputText>
                </div>
              </div>
            </FieldContainer>

            <FieldContainer>
              <div className="flex items-center">
                <div className="w-2/6">
                  <Select
                    showTitle={true}
                    options={genderOptions}
                    selectedOption={gender}
                    onOptionChanged={setGender}
                  ></Select>
                </div>
                <div className="w-2/6 ml-2">
                  <Select
                    showTitle={true}
                    options={statusOptions}
                    selectedOption={status}
                    onOptionChanged={setStatus}
                  ></Select>
                </div>
                <div className="  w-2/6 ml-2">
                  <Select
                    showTitle={true}
                    options={residentTypeOptions}
                    selectedOption={residentType}
                    onOptionChanged={setResidentType}
                  ></Select>
                </div>
              </div>
            </FieldContainer>
            <FieldContainer>
              <div className="flex items-center ">
                <div className="w-2/6">
                  <Select
                    options={locationSelected?.buildings?.map((x) => ({
                      text: x,
                      value: x,
                    }))}
                    selectedOption={building}
                    onOptionChanged={setBuilding}
                  ></Select>
                </div>
                <div className="w-2/6 ml-2">
                  <RoundedInputText
                    validator={validatorConfig.appartmentNumber}
                    value={appartmentNumber}
                    onChange={(e) => setAppartmentNumber(e.currentTarget.value)}
                    placeholder="Número de Apartamento"
                  ></RoundedInputText>
                </div>
                <div className="w-2/6 ml-2">
                  <RoundedInputText
                    validator={validatorConfig.numberOfResidents}
                    value={numberOfResidents}
                    onChange={(e) =>
                      setNumberOfResidents(e.currentTarget.value)
                    }
                    placeholder="Nro de Residentes"
                  ></RoundedInputText>
                </div>
              </div>
            </FieldContainer>
            <FieldContainer>
              <div className="flex items-center ">
                <div className="w-2/6">
                  <Select
                    options={["Seleccione", 0, 1, 2, 3, 4, 5].map((x) => ({
                      text: x,
                      value: x,
                    }))}
                    selectedOption={numberOfParkingSlots}
                    onOptionChanged={setNumberOfParkingSlots}
                  ></Select>
                </div>
                <div className="w-2/6 ml-2">
                  <RoundedInputText
                    value={parking1}
                    onChange={(e) => setParking1(e.currentTarget.value)}
                    placeholder="Estacionamiento 1"
                  ></RoundedInputText>
                </div>
                <div className="w-2/6 ml-2">
                  <RoundedInputText
                    value={parking2}
                    onChange={(e) => setParking2(e.currentTarget.value)}
                    placeholder="Estacionamiento 2"
                  ></RoundedInputText>
                </div>
              </div>
            </FieldContainer>
            <FieldContainer>
              <div className="flex items-center ">
                <div className="w-2/6">
                  <Select
                    options={["Mascotas?", 1, 2, 3, 4, 5].map((x) => ({
                      text: x,
                      value: x,
                    }))}
                    selectedOption={petCount}
                    onOptionChanged={setPetCount}
                  ></Select>
                </div>
                <div className="w-2/6 ml-2">
                  <Select
                    options={["Vehículos?", 1, 2, 3, 4, 5].map((x) => ({
                      text: x,
                      value: x,
                    }))}
                    selectedOption={numberOfVehicles}
                    onOptionChanged={setNumberOfVehicles}
                  ></Select>
                </div>
                <div className="w-2/6 ml-2"></div>
              </div>
            </FieldContainer>
            <FieldContainer>
              <div className="flex items-center ">
                <RoundedInputText
                  value={notes}
                  onChange={(e) => setNotes(e.currentTarget.value)}
                  placeholder="Notas u observaciones"
                ></RoundedInputText>
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
                ref={defaultButton}
                className="w-32 bg-gray-400  h-10 shadow-md rounded-md mr-5"
                onClick={() => router.back()}
              >
                Regresar
              </button>
              <button
                className="w-64 bg-purple-600 h-10 shadow-md rounded-md"
                onClick={handleContinueClicked}
              >
                Guardar
              </button>
            </div>
          </section>
        </div>
        <div className="flex xs:w-1/6"></div>
      </div>
    </Layout>
  );
}

export default ResidentCreatePage;
