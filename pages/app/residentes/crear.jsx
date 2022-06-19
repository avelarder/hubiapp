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
import { generatePassword } from "../../../utils/PasswordGenerator";
import RoundedInputText from "../../../components/common/roundedInputText";
import { uuid as v4 } from "uuidv4";
import { XIcon } from "@heroicons/react/solid";
import NewLayout from "../../../components/newLayout";
import { useLocationContext } from "../../../locationProvider";
import {
  StyledButton,
  StyledSecondaryButton,
} from "../../../components/admin/base-ui-components";
import FileUpload from "../../../components/common/file-upload";

export async function getServerSideProps(context) {
  const sendGridTemplateId =
    process.env.NEXT_PUBLIC_SENDGRID_TEMPLATE_ID_EMAIL_VERIFICATION;

  return {
    props: {
      sendGridTemplateId,
    }, // will be passed to the page component as props
  };
}

function ResidentCreatePage({ sendGridTemplateId }) {
  const router = useRouter();
  const { createUserWithEmailAndPassword } = useAuth();
  const { locationSelected } = useLocationContext();

  const validatorConfig = {
    numberOfResidents: {
      validate: (content) => {
        return VALIDATIONS.ONLY_NUMBERS_GREATHER_THAN_ZERO(content);
      },
      message: "Especifique un núm de residentes válido.",
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

  const handleOnCreateUser = async (email, password, confirmPassword) => {
    let userId = "";
    let activationHash = "";
    //check if passwords match. If they do, create user in Firebase
    // and redirect to your logged in page.
    if (
      VALIDATIONS.REQUIRED_FREE_TEXT(password) &&
      VALIDATIONS.REQUIRED_FREE_TEXT(confirmPassword) &&
      VALIDATIONS.PASSWORD(password) &&
      password === confirmPassword
    ) {
      const authUser = await createUserWithEmailAndPassword(email, password);

      const response = await fetch("/api/setActivationRecord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          to: email,
          templateId: sendGridTemplateId,
          activationType: "RESIDENT",
          userId: authUser.user.uid,
          email: email,
          password: password,
          locationId: locationSelected.id,
        }),
      });

      if (response.status === 202) {
        userId = authUser.user.uid;
        toast.success(
          "Usuario creado con éxito, le hemos enviado un correo para activar su cuenta."
        );

        const data = await response.json();
        activationHash = data.activationHash;
      } else {
        toast.error(
          "No pudimos enviarte en codigo de activación, por favor intente más tarde."
        );
      }
    } else {
      toast.error("La contraseña no coincide");
    }

    return { userId, activationHash };
  };

  const handleResidentDocumentsLink = async (residentId, url) => {
    const db = Firebase.default.firestore();
    const documentId = v4();

    await db
      .collection("Residents_Documents")
      .doc(documentId)
      .set({
        url: `${url}`,
        residentId: `${residentId}`,
        status: "ACTIVE",
        createdOnUTC: new Date().toISOString(),
        updatedOnUTC: new Date().toISOString(),
      });
  };

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
          await handleResidentDocumentsLink(residentId, fileURL);
        }
      );
    }
  };

  const handleCompleteRegistration = async (userId, formValues) => {
    const db = Firebase.default.firestore();

    await db
      .collection("Residents")
      .doc(userId)
      .set({
        fullName: `${formValues.firstName} ${formValues.lastName}`,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        phoneArea: formValues.phoneArea,
        phone: formValues.phone,
        email: formValues.email,
        documentType: formValues.documentType,
        documentId: formValues.documentId,
        address: formValues.address,
        appartmentNumber: formValues.appartmentNumber,
        notes: formValues.notes,
        petCount: formValues.petCount,
        numberOfResidents: formValues.numberOfResidents,
        parking1: formValues.parking1,
        parking2: formValues.parking2,
        numberOfVehicles: formValues.numberOfVehicles,
        numberOfParkingSlots: formValues.numberOfParkingSlots,
        building: formValues.building,
        gender: formValues.gender,
        status: formValues.status,
        residentType: formValues.residentType,
        residentTypeText: formValues.residentType.text,
        createdOnUTC: new Date().toISOString(),
        updatedOnUTC: new Date().toISOString(),
      });
  };
  const handleActivationRecord = async (userId) => {
    const db = Firebase.default.firestore();
    await db.collection("ActivationRecords").doc(userId).update({
      registered: true,
      registeredOnUTC: new Date().toISOString(),
    });
  };
  const handleContinueClicked = async (event, formValues) => {
    if (
      !validatorConfig.firstName.validate(formValues.firstName) ||
      !validatorConfig.lastName.validate(formValues.lastName) ||
      !validatorConfig.phone.validate(formValues.phone) ||
      !validatorConfig.email.validate(formValues.email) ||
      !validatorConfig.address.validate(formValues.address) ||
      !validatorConfig.appartmentNumber.validate(formValues.appartmentNumber) ||
      !validatorConfig.numberOfResidents.validate(
        formValues.numberOfResidents
      ) ||
      !validatorConfig.documentId.validate(formValues.documentId)
    ) {
      toast.warning("Por favor complete el formulario.");
      return;
    }

    if (formValues.images.length === 0) {
      toast.warning("No se ha seleccionado ningún archivo.");
      return;
    }

    const password = generatePassword();

    const { userId } = await handleOnCreateUser(
      formValues.email,
      password,
      password
    );

    await upload(userId, formValues.images);
    await handleCompleteRegistration(userId, formValues);
    await handleActivationRecord(userId);

    toast.success("Residente creado con éxito.");
    router.push("/app/residentes");

    event.preventDefault();
  };

  return (
    <NewLayout>
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
              <div className="flex justify-start text-white text-md font-bold  mt-8 w-full">
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
                className="w-32 bg-gray-400  h-10 shadow-md rounded-md mr-5"
                onClick={() => router.back()}
              >
                Regresar
              </StyledSecondaryButton>
              <StyledButton
                className="w-64 bg-purple-600 h-10 shadow-md rounded-md"
                onClick={(e) =>
                  handleContinueClicked(e, {
                    firstName,
                    lastName,
                    email,
                    documentId,
                    documentType,
                    address,
                    phone,
                    phoneArea,
                    gender,
                    status,
                    residentType,
                    building,
                    appartmentNumber,
                    numberOfParkingSlots,
                    numberOfResidents,
                    numberOfVehicles,
                    parking1,
                    parking2,
                    petCount,
                    notes,
                    images,
                  })
                }
              >
                Guardar
              </StyledButton>
            </div>
          </section>
        </div>
        <div className="flex xs:w-1/6"></div>
      </div>
    </NewLayout>
  );
}

export default ResidentCreatePage;
