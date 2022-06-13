import React, { useState, useEffect, useRef } from "react";
import FieldContainer from "../../../../components/common/field-container";
import Select from "../../../../components/common/select";
import RoundedInputText from "../../../../components/common/roundedInputText";
import { XIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Firebase from "../../../../firebase";
import useFirestoreQuery from "../../../../hooks/useFirestoreQuery";
import Loader from "../../../../components/common/loader";
import Layout from "../../../../components/layout";
import {
  phoneAreaOptions,
  documentTypeOptions,
  residentTypeOptions,
  statusOptions,
  genderOptions,
} from "../../../../utils/UI-Constants";
import DeleteModal from "../../../../components/common/delete-modal";
import { useLocationContext } from "../../../../locationProvider";
import { editResidentValidatorConfig as validatorConfig } from "../../../../utils/validators/residents";
import Thumbnail from "../../../../components/common/thumbnail";
import { toast } from "react-toastify";
import { v4 } from "uuid";

function ResidentEdit() {
  const router = useRouter();
  const { query } = router;
  const residentId = query.residentId;
  const { locationSelected } = useLocationContext();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
  const [newImages, setNewImages] = useState([]);
  const [phoneArea, setPhoneArea] = useState(
    phoneAreaOptions.find((x) => x.id === "PE/PER")
  );
  const [documentType, setDocumentType] = useState(documentTypeOptions[0]);

  const [gender, setGender] = useState(genderOptions[0]);
  const [status, setStatus] = useState(statusOptions[0]);
  const [residentType, setResidentType] = useState(residentTypeOptions[0]);
  const db = Firebase.default.firestore();

  const {
    data: dataResident,
    status: statusResident,
    error: errorResident,
  } = useFirestoreQuery(db.collection("Residents").doc(residentId));

  const {
    data: dataDocuments,
    status: statusDocuments,
    error: errorDocuments,
  } = useFirestoreQuery(
    db
      .collection("Residents_Documents")
      .where("residentId", "==", residentId ?? "")
  );

  const defaultButton = useRef(null);

  useEffect(() => {
    if (defaultButton.current) defaultButton.current.focus();
  }, [defaultButton]);

  useEffect(() => {
    if (dataResident) {
      setFirstName(dataResident.firstName);
      setLastName(dataResident.lastName);
      setEmail(dataResident.email);
      setPhone(dataResident.phone);
      setPhoneArea(dataResident.phoneArea);
      setDocumentId(dataResident.documentId);
      setDocumentType(dataResident.documentType);
      setGender(dataResident.gender);
      setStatus(dataResident.status);
      setResidentType(dataResident.residentType);
      setAddress(dataResident.address);
      setGender(dataResident.gender);
      setStatus(dataResident.status);
      setResidentType(dataResident.residentType);
      setBuilding(dataResident.building);
      setAppartmentNumber(dataResident.appartmentNumber);
      setNumberOfResidents(dataResident.numberOfResidents);
      setNumberOfParkingSlots(dataResident.numberOfParkingSlots);
      setNumberOfVehicles(dataResident.numberOfVehicles);
      setPetCount(dataResident.petCount);
      setParking1(dataResident.parking1);
      setParking2(dataResident.parking2);
      setNotes(dataResident.notes);
    }
    return () => {};
  }, [dataResident]);

  useEffect(() => {
    if (dataDocuments) {
      setImages(dataDocuments.map((document) => document));
    }
    return () => {};
  }, [dataDocuments]);

  if (statusResident === "loading") {
    return <Loader></Loader>;
  }
  if (statusResident === "error") {
    return `Error: ${errorResident.message}`;
  }
  if (dataResident === null) {
    return <Loader></Loader>;
  }

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
        residentTypeText: residentType.text,
        createdOnUTC: new Date().toISOString(),
        updatedOnUTC: new Date().toISOString(),
      });
  };

  const upload = async (residentId, newImages) => {
    const storage = Firebase.default.storage();

    for (let index = 0; index < newImages.length; index++) {
      const element = newImages[index];
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

  const handleCompleteRegistration = async (residentId, formValues) => {
    const db = Firebase.default.firestore();

    await db
      .collection("Residents")
      .doc(residentId)
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
        updatedOnUTC: new Date().toISOString(),
      });
  };
  const handleDeleteConfirmation = async () => {
    await db
      .collection("Residents")
      .doc(residentId)
      .delete();
    setShowDeleteModal(false);
    router.push("/app/residentes");
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

    if (images.length === 0 && formValues.newImages.length === 0) {
      toast.warning("No se ha seleccionado ningún archivo.");
      return;
    }

    if (formValues.newImages.length > 0)
      await upload(residentId, formValues.newImages);
    await handleCompleteRegistration(residentId, formValues);

    toast.success("Residente actualizado con éxito.");
    router.push("/app/residentes");

    event.preventDefault();
  };

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
            <FieldContainer title={"Galería de Imágenes"}>
              <div className="grid grid-flow-col w-full h-48 px-2">
                {images.map((x, i) => (
                  <Thumbnail key={i} imagePath={x.url}></Thumbnail>
                ))}
              </div>
            </FieldContainer>
            <FieldContainer>
              <div className="flex justify-start text-white text-md font-bold  mt-8 ">
                <div className="flex flex-col">
                  <input
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    type="file"
                    onChange={(e) => {
                      const newImageList = [...newImages, e.target.files[0]];
                      setNewImages(newImageList);
                      e.target.value = "";
                    }}
                    title="Seleccione una imagen"
                  />
                  {newImages.length === 0 ? (
                    <span className="text-black">0 archivos.</span>
                  ) : (
                    <ul className="flex flex-col mt-4 list-disc w-full">
                      {newImages.map((image, index) => (
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
                    newImages,
                  })
                }
              >
                Guardar
              </button>
            </div>
          </section>
        </div>
        <div className="flex xs:w-1/6"></div>
      </div>

      {showDeleteModal && (
        <DeleteModal
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirmation}
        ></DeleteModal>
      )}
    </Layout>
  );
}

export default ResidentEdit;
