/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import FieldContainer from "../../../../components/common/field-container";
import Image from "next/image";
import { XIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Firebase from "../../../../firebase";
import useFirestoreQuery from "../../../../hooks/useFirestoreQuery";
import Loader from "../../../../components/common/loader";
import Layout from "../../../../components/layout";
import MainSection from "../../../../components/dashboard/mainSection";
import {
  phoneAreaOptions,
  documentTypeOptions,
  collaboratorTypeOptions,
  statusOptions,
  genderOptions,
  VALIDATIONS,
} from "../../../../utils/UI-Constants";
import DeleteModal from "../../../../components/common/delete-modal";

function Thumbnail({ imagePath }) {
  let defaultPathImage = "/hubi-logo.jpg";

  const [image, setImage] = useState(defaultPathImage);

  const storage = Firebase.default.storage();

  useEffect(() => {
    if (image == defaultPathImage) {
      storage
        .ref()
        .child(imagePath)
        .getDownloadURL()
        .then((url) => {
          setImage(url);
        })
        .catch((error) => {});
    }
  }, [image, imagePath, storage, defaultPathImage]);

  return (
    <div className="grid relative w-32 h-32 bg-gray-50 m-2">
      <img
        className="block relative object-cover w-full h-full"
        src={image}
        width={128}
        height={128}
        alt="Cover"
        onClick={() => window.open(image, "_blank")}
      ></img>
      <XIcon className="grid w-8 h-8 absolute text-center cursor-pointer hover:bg-purple-700 text-white bg-purple-900 "></XIcon>
    </div>
  );
}

function EmployeeDetails() {
  const router = useRouter();
  const { query } = router;

  const id = query.collaboratorId;
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [images, setImages] = useState([]);
  const [phoneArea, setPhoneArea] = useState(phoneAreaOptions[0]);
  const [documentType, setDocumentType] = useState(documentTypeOptions[0]);

  const [gender, setGender] = useState(genderOptions[0]);
  const [collaboratorStatus, setEmployeeStatus] = useState(statusOptions[0]);
  const [collaboratorType, setEmployeeType] = useState(
    collaboratorTypeOptions[0]
  );

  const db = Firebase.default.firestore();

  const {
    data: dataEmployee,
    status: statusEmployee,
    error: errorEmployee,
  } = useFirestoreQuery(db.collection("Collaborators").doc(id));

  const {
    data: dataDocuments,
    status: statusDocuments,
    error: errorDocuments,
  } = useFirestoreQuery(
    db
      .collection("Collaborators_Documents")
      .where("collaboratorId", "==", id ?? "")
  );

  const defaultButton = useRef(null);

  useEffect(() => {
    if (defaultButton.current) defaultButton.current.focus();
  }, [defaultButton]);

  useEffect(() => {
    if (dataEmployee) {
      setFirstName(dataEmployee.firstName);
      setAddress(dataEmployee.address);
      setLastName(dataEmployee.lastName);
      setEmail(dataEmployee.email);
      setPhone(dataEmployee.phone);
      setPhoneArea(dataEmployee.phoneArea);
      setDocumentId(dataEmployee.documentId);
      setDocumentType(dataEmployee.documentType);
      setGender(dataEmployee.gender);
      setEmployeeStatus(dataEmployee.status);
      setEmployeeType(dataEmployee.collaboratorType);
    }
    return () => {};
  }, [dataEmployee]);

  useEffect(() => {
    if (dataDocuments) {
      setImages(dataDocuments.map((document) => document));
    }
    return () => {};
  }, [dataDocuments]);

  if (statusEmployee === "loading") {
    return <Loader></Loader>;
  }
  if (statusEmployee === "error") {
    return `Error: ${errorEmployee.message}`;
  }
  if (dataEmployee === null) {
    return <Loader></Loader>;
  }

  const handleEditClicked = async (event) => {
    router.push(`/app/colaboradores/${id}/editar`);
  };

  const handleDeleteConfirmation = async () => {
    await db
      .collection("Collaborators")
      .doc(id)
      .delete();
    setShowDeleteModal(false);
    router.push("/app/colaboradores");
  };

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto">
        <MainSection>
          <div className="flex flex-col h-screen w-full">
            <div className="flex h-screen">
              <div className="flex xs:w-2/6"></div>
              <div className="flex flex-col  xs:w-2/6  items-left  align-middle mt-10">
                <section className="">
                  <h1 className="text-gray-900 text-3xl font-bold text-center mb-10">
                    Detalle de Colaborador
                  </h1>
                  <h3 className="font-bold">Información Personal</h3>
                </section>
                <section>
                  <div className="flex items-center ">
                    <div className="w-2/4">
                      <FieldContainer title={"Nombres"}>
                        <span>{firstName}</span>
                      </FieldContainer>
                    </div>
                    <div className="w-2/4 ml-2">
                      <FieldContainer title={"Apellidos"}>
                        <span>{lastName}</span>
                      </FieldContainer>
                    </div>
                  </div>

                  <FieldContainer title={"Phone"}>
                    <div className="flex items-center ">
                      <div className="w-2/4">
                        <span>{phoneArea.text}</span>
                      </div>
                      <div className="w-2/4 ml-2">
                        <span>{phone}</span>
                      </div>
                    </div>
                  </FieldContainer>
                  <FieldContainer title={"Correo Electrónico"}>
                    <span>{email}</span>
                  </FieldContainer>
                  <FieldContainer title={"Documento de Identidad"}>
                    <div className="flex items-center ">
                      <div className="w-2/4">
                        <span>{documentType.text}</span>
                      </div>
                      <div className="w-2/4 ml-2">
                        <span>{documentId}</span>
                      </div>
                    </div>
                  </FieldContainer>
                  <FieldContainer title={"Dirección"}>
                    <span>{address}</span>
                  </FieldContainer>
                  <FieldContainer title={"Género"}>
                    <div className="flex flex-wrap">
                      <div className="flex md:flex-col w-2/6">
                        <span>{gender.text}</span>
                      </div>
                      <div className="flex md:flex-col w-2/6">
                        <span>{collaboratorStatus.text}</span>
                      </div>
                      <div className="flex md:flex-col w-2/6">
                        <span>{collaboratorType.text}</span>
                      </div>
                    </div>
                  </FieldContainer>
                  <FieldContainer title={"Galería de Imágenes"}>
                    <div className="grid grid-flow-col w-full overflow-x-scroll px-2">
                      {/* <div className="grid relative w-32 h-32 bg-gray-50 m-2">
                        <Image
                          className="block relative"
                          src={"/hubi-logo.jpg"}
                          width={128}
                          height={128}
                          alt="Cover"
                        ></Image>
                        <XIcon className="grid w-10 h-10 absolute text-center cursor-pointer hover:bg-purple-700 text-white bg-purple-900 "></XIcon>
                      </div> */}
                      {images.map((x, i) => (
                        <Thumbnail key={i} imagePath={x.url}></Thumbnail>
                      ))}
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
                      onClick={handleEditClicked}
                    >
                      Editar
                    </button>
                  </div>
                </section>
              </div>
              <div className="flex xs:w-2/6"></div>
            </div>
          </div>
          {showDeleteModal && (
            <DeleteModal
              onCancel={() => setShowDeleteModal(false)}
              onConfirm={handleDeleteConfirmation}
            ></DeleteModal>
          )}
        </MainSection>
      </div>
    </Layout>
  );
}

export default EmployeeDetails;
