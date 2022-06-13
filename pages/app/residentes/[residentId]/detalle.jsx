/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import FieldContainer from "../../../../components/common/field-container";
import Thumbnail from "../../../../components/common/thumbnail";
import { useRouter } from "next/router";
import Firebase from "../../../../firebase";
import useFirestoreQuery from "../../../../hooks/useFirestoreQuery";
import Loader from "../../../../components/common/loader";
import Layout from "../../../../components/layout";
import RoundedLabel from "../../../../components/common/roundedLabel";

import DeleteModal from "../../../../components/common/delete-modal";

function ResidentDetails() {
  const router = useRouter();
  const { query } = router;

  const id = query.residentId;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [images, setImages] = useState([]);

  const db = Firebase.default.firestore();

  const {
    data: dataResident,
    status: statusResident,
    error: errorResident,
  } = useFirestoreQuery(db.collection("Residents").doc(id));

  const {
    data: dataDocuments,
    status: statusDocuments,
    error: errorDocuments,
  } = useFirestoreQuery(
    db.collection("Residents_Documents").where("residentId", "==", id ?? "")
  );

  const defaultButton = useRef(null);

  useEffect(() => {
    if (defaultButton.current) defaultButton.current.focus();
  }, [defaultButton]);

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

  const handleEditClicked = async (event) => {
    router.push(`/app/residentes/${id}/editar`);
  };

  const handleDeleteConfirmation = async () => {
    await db
      .collection("Residents")
      .doc(id)
      .delete();
    setShowDeleteModal(false);
    router.push("/app/residentes");
  };

  return (
    <Layout>
      <div className="flex items-start h-screen">
        <div className="flex xs:w-1/6"></div>
        <div className="flex flex-col  xs:w-4/6  items-left  align-middle mt-10">
          <section className="">
            <h1 className="text-gray-900 text-3xl font-bold text-center mb-10 uppercase">
              {`${dataResident.firstName} ${dataResident.lastName}`}
            </h1>
          </section>
          <section>
            <h3 className="font-bold">Información Personal</h3>
            <FieldContainer>
              <div className="flex items-center ">
                <div className="w-1/6">
                  <RoundedLabel
                    label={`Código Area`}
                    value={dataResident.phoneArea.text}
                  ></RoundedLabel>
                </div>
                <div className="w-2/6 ml-2">
                  <RoundedLabel
                    label={`Número de Contacto`}
                    value={dataResident.phone}
                  ></RoundedLabel>
                </div>
                <div className="w-3/6 ml-2">
                  <RoundedLabel
                    label={`Correo Electrónico`}
                    value={dataResident.email}
                  ></RoundedLabel>
                </div>
              </div>
            </FieldContainer>
            <FieldContainer>
              <div className="flex items-center ">
                <div className="w-1/6">
                  <RoundedLabel
                    label={`Documento`}
                    value={dataResident.documentType.text}
                  ></RoundedLabel>
                </div>
                <div className="w-2/6 ml-2">
                  <RoundedLabel
                    label={`Número de Documento`}
                    value={dataResident.documentId}
                  ></RoundedLabel>
                </div>
                <div className="w-3/6 ml-2">
                  <RoundedLabel
                    label={`Dirección de Contacto`}
                    value={dataResident.address}
                  ></RoundedLabel>
                </div>
              </div>
            </FieldContainer>

            <FieldContainer>
              <div className="flex items-center">
                <div className="w-2/6">
                  <RoundedLabel
                    label={`Género`}
                    value={dataResident.gender.text}
                  ></RoundedLabel>
                </div>
                <div className="w-2/6 ml-2">
                  <RoundedLabel
                    label={`Estado Civil`}
                    value={dataResident.status.text}
                  ></RoundedLabel>
                </div>
                <div className="  w-2/6 ml-2">
                  <RoundedLabel
                    label={`Tipo de Residente`}
                    value={dataResident.residentType.text}
                  ></RoundedLabel>
                </div>
              </div>
            </FieldContainer>
            <FieldContainer>
              <div className="flex items-center ">
                <div className="w-2/6">
                  <RoundedLabel
                    label={`Edificio/Bloque`}
                    value={dataResident.building.text}
                  ></RoundedLabel>
                </div>
                <div className="w-2/6 ml-2">
                  <RoundedLabel
                    label={`Número de Apartamento`}
                    value={dataResident.appartmentNumber}
                  ></RoundedLabel>
                </div>
                <div className="w-2/6 ml-2">
                  <RoundedLabel
                    label={`Número de Residentes en el Apartamento`}
                    value={dataResident.numberOfResidents.text}
                  ></RoundedLabel>
                </div>
              </div>
            </FieldContainer>
            <FieldContainer>
              <div className="flex items-center ">
                <div className="w-2/6">
                  <RoundedLabel
                    label={`Número de Estacionamientos Asignados`}
                    selectedOption={dataResident.numberOfParkingSlots.text}
                  ></RoundedLabel>
                </div>
                <div className="w-2/6 ml-2">
                  <RoundedLabel
                    label={`Estacionamiento 1`}
                    value={dataResident.parking1}
                  ></RoundedLabel>
                </div>
                <div className="w-2/6 ml-2">
                  <RoundedLabel
                    label={`Estacionamiento 2`}
                    value={dataResident.parking2}
                  ></RoundedLabel>
                </div>
              </div>
            </FieldContainer>
            <FieldContainer>
              <div className="flex items-center ">
                <div className="w-2/6">
                  <RoundedLabel
                    label={`Número de Mascotas`}
                    value={dataResident.petCount.text}
                  ></RoundedLabel>
                </div>
                <div className="w-2/6 ml-2">
                  <RoundedLabel
                    label={`Número de Vehículos`}
                    value={dataResident.numberOfVehicles.text}
                  ></RoundedLabel>
                </div>
                <div className="w-2/6 ml-2"></div>
              </div>
            </FieldContainer>
            <FieldContainer>
              <div className="flex items-center ">
                <div className="w-2/6">
                  <RoundedLabel
                    label={`Notas y Comentarios`}
                    value={dataResident.notes}
                  ></RoundedLabel>
                </div>
              </div>
            </FieldContainer>

            <FieldContainer title={"Galería de Imágenes"}>
              <div className="grid grid-flow-col w-full h-48 px-2">
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

export default ResidentDetails;
