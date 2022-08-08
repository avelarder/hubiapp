import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Firebase from "../../../../firebase";
import useFirestoreQuery from "../../../../hooks/useFirestoreQuery";

import NewLayout from "../../../../components/newLayout";
import MainSection from "../../../../components/dashboard/mainSection";
import DeleteModal from "../../../../components/common/delete-modal";
import Loader from "../../../../components/common/loader";

import {
  Divider,
  StyledButton,
  StyledSecondaryButton,
} from "../../../../components/admin/base-ui-components";
import RentModal from "../../../../components/event/event-modal";
import Image from "next/image";
import {
  BadgeCheckIcon,
  CalendarIcon,
  LocationMarkerIcon,
  LockClosedIcon,
  PhoneIcon,
} from "@heroicons/react/outline";
import ImageCover from "../../../../components/common/imageCover";
import RentScreenEdit from "../../../../components/rent/rent-screen-edit";

function ViewRentPage() {
  const [showCreateRent, setShowCreateRent] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [images, setImages] = useState([]);
  const router = useRouter();
  const { query } = router;
  const [itemsForDeletion, setItemsForDeletion] = useState([]);

  const id = query.id;

  const db = Firebase.default.firestore();
  let operation = {};

  const defaultButton = useRef(null);

  const {
    data: dataRent,
    status: statusRent,
    error: errorRent,
  } = useFirestoreQuery(db.collection("Rent").doc(id));

  const {
    data: dataDocuments,
    status: statusDocuments,
    error: errorDocuments,
  } = useFirestoreQuery(
    db.collection("Rent_Documents").where("operationId", "==", id ?? "")
  );

  useEffect(() => {
    if (dataDocuments) {
      setImages(dataDocuments.map((document) => document));
    }
    return () => {};
  }, [dataDocuments]);

  if (statusRent === "loading") {
    return <Loader></Loader>;
  }
  if (statusRent === "error") {
    return `Error: ${error.message}`;
  }
  if (dataRent === null) {
    return <Loader></Loader>;
  }
  if (dataRent) {
    operation = {
      id: dataRent.id,
      description: dataRent.description,
      title: dataRent.title,
      phone: dataRent.phone,
      location: dataRent.location,
      price: dataRent.price,
      operationStatusOption: dataRent.operationStatusOption,
      operationPrivacyOption: dataRent.operationPrivacyOption,
      createdOnUTC: dataRent.createdOnUTC,
      updatedOnUTC: dataRent.updatedOnUTC,
    };
  }

  const handleEditClicked = async (event) => {
    setShowCreateRent(true);
  };

  const handleBack = () => {
    router.back();
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };
  const handleDeleteConfirmation = async () => {
    await db.collection("Rent").doc(id).delete();
    setShowDeleteModal(false);
    router.push("/app/comunidad");
  };
  const hideCreateRentModal = () => {
    setItemsForDeletion([]);
    setShowCreateRent(false);
  };

  const handleRemoveDocument = async (docId) => {
    setItemsForDeletion((prev) => [...prev, docId]);
  };

  return (
    <NewLayout>
      <div className="px-4 sm:px-6 lg:px-8 mx-auto">
        <MainSection>
          <div className="flex flex-col h-screen w-full ">
            <div className="flex h-screen">
              <div className="flex lg:w-1/6"></div>
              <div className="flex flex-col flex-1 lg:w-4/6 w-full items-center align-middle p-5 ">
                <section className="w-full ">
                  <h1 className="text-gray-900 text-2xl font-bold text-center mb-10 uppercase w-full ">
                    Detalle de Alquiler
                  </h1>
                </section>
                <section className="flex w-full justify-center ">
                  <div className="flex flex-col w-full border-1 border-gray-100  rounded-lg p-4">
                    <div className="flex w-full rounded-lg border-1 border-gray-100 mb-4">
                      {images.filter(
                        (x) =>
                          itemsForDeletion.length === 0 ||
                          !itemsForDeletion.includes(x.id)
                      ) && (
                        <div className="flex flex-wrap w-full">
                          {images
                            .filter(
                              (x) =>
                                itemsForDeletion.length === 0 ||
                                !itemsForDeletion.includes(x.id)
                            )
                            .map((doc) => (
                              <ImageCover
                                imagePath={doc.url}
                                key={doc.id}
                              ></ImageCover>
                            ))}
                        </div>
                      )}
                    </div>
                    <div className="flex w-full rounded-lg border-1 border-purple-200  mb-4 flex-wrap ">
                      <div className="flex flex-col items-center ml-4 w-full">
                        <Image
                          className="w-6 h-6 rounded-full"
                          src="/sample-profile.jpg"
                          width="32"
                          height="32"
                          alt="User"
                        />

                        <span className=" ml-4 text-sm ">
                          publicado por &nbsp;<b>Oscar Velarde</b>
                        </span>
                      </div>
                      <div className="flex  justify-center w-full ">
                        <StyledButton className={"w-28"}>
                          Interesado
                        </StyledButton>
                        <StyledButton className={"w-28"}>
                          No interés
                        </StyledButton>
                      </div>
                    </div>
                    <div className="flex  w-full rounded-lg border-1 item border-purple-200  px-8 py-4 ">
                      <div className="flex xs:flex-col w-2/3">
                        <span className="text-2xl font-bold">
                          {operation.title}
                        </span>
                        <p className="text-sm">{operation.description} </p>
                        <Divider></Divider>
                        <p className="flex text-sm w-full items-center">
                          <LockClosedIcon className="w-4 h-4 mr-4"></LockClosedIcon>
                          {operation.operationPrivacyOption.text}
                        </p>
                        <p className="flex text-sm w-full items-center">
                          <BadgeCheckIcon className="w-4 h-4 mr-4"></BadgeCheckIcon>
                          {operation.operationStatusOption.text}
                        </p>
                        <p className="flex text-sm w-full items-center">
                          <PhoneIcon className="w-4 h-4 mr-4"></PhoneIcon>
                          {operation.phone}
                        </p>
                        <p className="flex text-sm w-full items-center">
                          <CalendarIcon className="w-4 h-4 mr-4"></CalendarIcon>
                          {operation.createdOnUTC.toLocaleString("es-ES")}
                        </p>
                        <p className="flex text-sm w-full items-center">
                          <LocationMarkerIcon className="w-4 h-4 mr-4"></LocationMarkerIcon>
                          {operation.location}
                        </p>
                      </div>
                      <div className="flex flex-col xs:flex-wrap w-1/3 items-center justify-center">
                        <span className="flex text-4xl font-bold text-center justify-center bg-gray-200 h-14 items-center p-4">
                          S/.{operation.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="flex justify-end text-white text-md font-bold  mt-8 w-full pr-4 ">
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
              <div className="flex xs:w-1/6 w-0"></div>
            </div>
          </div>
          {showCreateRent && (
            <RentModal title={"Modificar Rento"} onCancel={hideCreateRentModal}>
              <RentScreenEdit
                itemsForDeletion={itemsForDeletion}
                operation={operation}
                documents={images}
                onCancel={hideCreateRentModal}
                onRemoveDocument={handleRemoveDocument}
              ></RentScreenEdit>
            </RentModal>
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

export default ViewRentPage;
