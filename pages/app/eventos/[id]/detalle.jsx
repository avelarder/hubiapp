import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Firebase from "../../../../firebase";
import useFirestoreQuery from "../../../../hooks/useFirestoreQuery";

import NewLayout from "../../../../components/newLayout";
import MainSection from "../../../../components/dashboard/mainSection";
import DeleteModal from "../../../../components/common/delete-modal";
import Loader from "../../../../components/common/loader";
import FieldContainer from "../../../../components/common/field-container";
import RoundedLabel from "../../../../components/common/roundedLabel";

import Thumbnail from "../../../../components/common/thumbnail";
import moment from "moment";
import {
  StyledButton,
  StyledSecondaryButton,
} from "../../../../components/admin/base-ui-components";
import EventModal from "../../../../components/event/event-modal";
import EventNewsScreenEdit from "../../../../components/event/event-screen-edit";

function ViewEventPage() {
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [images, setImages] = useState([]);
  const router = useRouter();
  const { query } = router;
  const [itemsForDeletion, setItemsForDeletion] = useState([]);

  const id = query.id;

  const db = Firebase.default.firestore();
  let event = {};

  const defaultButton = useRef(null);

  const {
    data: dataEvent,
    status: statusEvent,
    error: errorEvent,
  } = useFirestoreQuery(db.collection("Events").doc(id));

  const {
    data: dataDocuments,
    status: statusDocuments,
    error: errorDocuments,
  } = useFirestoreQuery(
    db.collection("Event_Documents").where("eventId", "==", id ?? "")
  );

  useEffect(() => {
    if (dataDocuments) {
      setImages(dataDocuments.map((document) => document));
    }
    return () => {};
  }, [dataDocuments]);

  if (statusEvent === "loading") {
    return <Loader></Loader>;
  }
  if (statusEvent === "error") {
    return `Error: ${error.message}`;
  }
  if (dataEvent === null) {
    return <Loader></Loader>;
  }
  if (dataEvent) {
    event = {
      id: dataEvent.id,
      description: dataEvent.description,
      startDate: dataEvent.startDate,
      endDate: dataEvent.endDate,
      eventName: dataEvent.eventName,
      eventLocation: dataEvent.eventLocation,
      eventPrivacy: dataEvent.eventPrivacy,
      createdOnUTC: dataEvent.createdOnUTC,
      updatedOnUTC: dataEvent.updatedOnUTC,
    };
  }

  const handleEditClicked = async (event) => {
    setShowCreateEvent(true);
  };

  const handleBack = () => {
    router.back();
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };
  const handleDeleteConfirmation = async () => {
    await db.collection("Events").doc(id).delete();
    setShowDeleteModal(false);
    router.push("/app/comunidad");
  };
  const hideCreateEventModal = () => {
    setItemsForDeletion([]);
    setShowCreateEvent(false);
  };

  const handleRemoveDocument = async (docId) => {
    setItemsForDeletion((prev) => [...prev, docId]);
  };

  return (
    <NewLayout>
      <div className="px-4 sm:px-6 lg:px-8 mx-auto">
        <MainSection>
          <div className="flex flex-col h-screen w-full">
            <div className="flex h-screen">
              <div className="flex xs:w-1/6"></div>
              <div className="flex flex-col flex-1 xs:w-2/6  items-left  align-middle  p-5">
                <section className="">
                  <h1 className="text-gray-900 text-2xl font-bold text-center mb-10 uppercase">
                    Detalle de Evento
                  </h1>
                </section>
                <section>
                  <div className="flex items-center ">
                    <div className="w-full">
                      <FieldContainer>
                        <RoundedLabel
                          label={`Nombre del Evento`}
                          value={event.eventName}
                        ></RoundedLabel>
                      </FieldContainer>
                      <FieldContainer>
                        <RoundedLabel
                          label={`Descripción`}
                          value={event.description}
                        ></RoundedLabel>
                      </FieldContainer>
                      <FieldContainer>
                        <RoundedLabel
                          label={`Fecha de Inicio`}
                          value={event.startDate}
                        ></RoundedLabel>
                      </FieldContainer>
                      <FieldContainer>
                        <RoundedLabel
                          label={`Fecha de Fin`}
                          value={event.endDate}
                        ></RoundedLabel>
                      </FieldContainer>
                      <FieldContainer>
                        <RoundedLabel
                          label={`Lugar`}
                          value={event.eventLocation}
                        ></RoundedLabel>
                      </FieldContainer>
                      <FieldContainer>
                        <RoundedLabel
                          label={`Tipo de Evento`}
                          value={event.eventPrivacy.text}
                        ></RoundedLabel>
                      </FieldContainer>
                    </div>
                  </div>
                </section>

                {images.length > 0 && (
                  <section>
                    <div className="flex flex-col border-1 border-gray-100 rounded-lg p-4 mt-4 ">
                      <span className="flex text-gray-400 text-xs my-2 font-bold">
                        Archivos Adjuntos
                      </span>
                      <FieldContainer>
                        <div className="grid grid-flow-col w-full h-48 px-2">
                          {images.map((x, i) => (
                            <Thumbnail key={i} imagePath={x.url}></Thumbnail>
                          ))}
                        </div>
                      </FieldContainer>
                    </div>
                  </section>
                )}
                <div className="flex justify-end text-white text-md font-bold  mt-8 ">
                  <StyledSecondaryButton
                    ref={defaultButton}
                    className="w-32 bg-gray-400  h-10 shadow-md rounded-md mr-5"
                    onClick={() => router.push("/app/comunidad")}
                  >
                    Regresar
                  </StyledSecondaryButton>
                  <StyledButton onClick={handleEditClicked}>
                    Editar
                  </StyledButton>
                </div>
              </div>
              <div className="flex xs:w-1/6"></div>
            </div>
          </div>
          {showCreateEvent && (
            <EventModal
              title={"Modificar Evento"}
              onCancel={hideCreateEventModal}
            >
              <EventNewsScreenEdit
                itemsForDeletion={itemsForDeletion}
                event={event}
                documents={images}
                onCancel={hideCreateEventModal}
                onRemoveDocument={handleRemoveDocument}
              ></EventNewsScreenEdit>
            </EventModal>
          )}
          {showDeleteModal && (
            <DeleteModal
              onCancel={() => setShowDeleteModal(false)}
              onConfirm={handleDeleteConfirmation}
            ></DeleteModal>
          )}
        </MainSection>
      </div>
    </NewLayout>
  );
}

export default ViewEventPage;
