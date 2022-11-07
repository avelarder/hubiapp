/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import FieldContainer from "../../../../components/common/field-container";
import Thumbnail from "../../../../components/common/thumbnail";
import { useRouter } from "next/router";
import Firebase from "../../../../firebase";
import useFirestoreQuery from "../../../../hooks/useFirestoreQuery";
import Loader from "../../../../components/common/loader";
import NewLayout from "../../../../components/newLayout";
import RoundedLabel from "../../../../components/common/roundedLabel";

import DeleteModal from "../../../../components/common/delete-modal";
import {
  StyledButton,
  StyledSecondaryButton,
} from "../../../../components/admin/base-ui-components";

function IncidentDetails() {
  const router = useRouter();
  const { query } = router;

  const id = query.incidenciaId;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [images, setImages] = useState([]);

  const db = Firebase.default.firestore();

  const {
    data: dataIncident,
    status: statusIncident,
    error: errorIncident,
  } = useFirestoreQuery(db.collection("Incidents").doc(id));

  const {
    data: dataDocuments,
    status: statusDocuments,
    error: errorDocuments,
  } = useFirestoreQuery(
    db.collection("Incident_Documents").where("incidentId", "==", id ?? "")
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

  if (statusIncident === "loading") {
    return <Loader></Loader>;
  }
  if (statusIncident === "error") {
    return `Error: ${errorIncident.message}`;
  }
  //   if (dataIncident === null) {
  //     return <Loader></Loader>;
  //   }

  const handleEditClicked = async (event) => {
    router.push(`/app/seguridad/${id}/editar`);
  };

  const handleDeleteConfirmation = async () => {
    await db.collection("Incidents").doc(id).delete();
    setShowDeleteModal(false);
    router.push("/app/seguridad");
  };

  return (
    <NewLayout>
      <div className="flex items-start h-screen">
        <div className="flex xs:w-1/6"></div>
        <div className="flex flex-col  xs:w-4/6  items-left  align-middle mt-10">
          <section className="">
            <h1 className="text-gray-900 text-3xl font-bold text-center mb-10 uppercase">
              {`Incidencia`}
            </h1>
          </section>
          <section>
            <FieldContainer>
              <RoundedLabel
                label={`Tipo de Incidente`}
                value={dataIncident.incidentType.text}
              ></RoundedLabel>
              <RoundedLabel
                label={`Título`}
                value={dataIncident.title}
              ></RoundedLabel>
              <div className="mt-4">
                <span className="text-gray-400 text-xs ml-6 ">
                  {"Description"}
                </span>
                <div
                  className={
                    "flex items-start p-2 text-sm h-40 text-black w-full  border-gray-100  rounded-2xl border-1 pl-6"
                  }
                >
                  {dataIncident.description}
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
              <StyledSecondaryButton
                ref={defaultButton}
                className="w-32 bg-gray-400  h-10 shadow-md rounded-md mr-5"
                onClick={() => router.back()}
              >
                Regresar
              </StyledSecondaryButton>

              <StyledButton
                className="w-64 bg-purple-600 h-10 shadow-md rounded-md"
                onClick={handleEditClicked}
              >
                Editar
              </StyledButton>
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
    </NewLayout>
  );
}

export default IncidentDetails;
