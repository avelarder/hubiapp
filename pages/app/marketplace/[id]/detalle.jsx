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
  Divider,
  StyledButton,
  StyledSecondaryButton,
} from "../../../../components/admin/base-ui-components";
import MarketplaceModal from "../../../../components/event/event-modal";
import MarketplaceNewsScreenEdit from "../../../../components/event/event-screen-edit";
import Image from "next/image";
import {
  CalendarIcon,
  LocationMarkerIcon,
  LockClosedIcon,
  PhoneIcon,
} from "@heroicons/react/outline";
import { monthsInText } from "../../../../utils/UI-Constants";
import ImageCover from "../../../../components/common/imageCover";
import MarketplaceScreenEdit from "../../../../components/marketplace/marketplace-screen-edit";

function ViewMarketplacePage() {
  const [showCreateMarketplace, setShowCreateMarketplace] = useState(false);
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
    data: dataMarketplace,
    status: statusMarketplace,
    error: errorMarketplace,
  } = useFirestoreQuery(db.collection("Marketplace").doc(id));

  const {
    data: dataDocuments,
    status: statusDocuments,
    error: errorDocuments,
  } = useFirestoreQuery(
    db.collection("Marketplace_Documents").where("operationId", "==", id ?? "")
  );

  useEffect(() => {
    if (dataDocuments) {
      setImages(dataDocuments.map((document) => document));
    }
    return () => {};
  }, [dataDocuments]);

  if (statusMarketplace === "loading") {
    return <Loader></Loader>;
  }
  if (statusMarketplace === "error") {
    return `Error: ${error.message}`;
  }
  if (dataMarketplace === null) {
    return <Loader></Loader>;
  }
  if (dataMarketplace) {
    operation = {
      id: dataMarketplace.id,
      description: dataMarketplace.description,
      title: dataMarketplace.title,
      phone: dataMarketplace.phone,
      location: dataMarketplace.location,
      price: dataMarketplace.price,
      operationStatusOption: dataMarketplace.operationStatusOption,
      operationPrivacyOption: dataMarketplace.operationPrivacyOption,
      operationTypeOption: dataMarketplace.operationTypeOption,
      createdOnUTC: dataMarketplace.createdOnUTC,
      updatedOnUTC: dataMarketplace.updatedOnUTC,
    };
  }

  const handleEditClicked = async (event) => {
    setShowCreateMarketplace(true);
  };

  const handleBack = () => {
    router.back();
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };
  const handleDeleteConfirmation = async () => {
    await db.collection("Marketplace").doc(id).delete();
    setShowDeleteModal(false);
    router.push("/app/comunidad");
  };
  const hideCreateMarketplaceModal = () => {
    setItemsForDeletion([]);
    setShowCreateMarketplace(false);
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
              <div className="flex flex-col flex-1 xs:w-2/6 w-full  items-center align-middle  p-5">
                <section className="">
                  <h1 className="text-gray-900 text-2xl font-bold text-center mb-10 uppercase">
                    Detalle de la Operación
                  </h1>
                </section>
                <section className="flex justify-center">
                  <div className="flex flex-col w-2/3 border-1 border-gray-100  rounded-lg p-4">
                    <div className="flex  w-full rounded-lg border-1 border-gray-100 h-2/6 mb-4">
                      {images.filter(
                        (x) =>
                          itemsForDeletion.length === 0 ||
                          !itemsForDeletion.includes(x.id)
                      ) && (
                        <div className="flex flex-wrap mt-4  w-full">
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
                    <div className="flex xs:flex-col  w-full rounded-lg border-1 border-purple-200 h-1/6 mb-4 ">
                      <div className="flex items-center ml-4 w-full">
                        <Image
                          className="w-6 h-6 rounded-full"
                          src="/sample-profile.jpg"
                          width="32"
                          height="32"
                          alt="User"
                        />

                        <span className="flex ml-4 text-sm">
                          publicado por &nbsp;<b>Oscar Velarde</b>
                        </span>
                      </div>
                      <div className="flex xs:justify-end w-full mr-4 items-center ">
                        <StyledButton className={"w-28"}>
                          Interesado
                        </StyledButton>
                        <StyledButton className={"w-28"}>
                          No interés
                        </StyledButton>
                      </div>
                    </div>
                    <div className="flex  w-full rounded-lg border-1 border-purple-200 h-3/6 px-8 py-4">
                      <div className="flex flex-col w-2/3">
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
                          <LockClosedIcon className="w-4 h-4 mr-4"></LockClosedIcon>
                          {operation.operationStatusOption.text}
                        </p>
                        <p className="flex text-sm w-full items-center">
                          <PhoneIcon className="w-4 h-4 mr-4"></PhoneIcon>
                          {operation.phone.text}
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
                      <div className="flex flex-col w-1/3 items-center justify-center">
                        <div className="flex flex-col justify-center w-20">
                          <span className="flex font-bold bg-purple-400 text-white text-center justify-center rounded-t-md items-center">
                            {operation.operationTypeOption.text}
                          </span>
                          <span className="flex text-4xl font-bold text-center justify-center bg-gray-200 h-14 items-center">
                            S/.{operation.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

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
          {showCreateMarketplace && (
            <MarketplaceModal
              title={"Modificar Marketplaceo"}
              onCancel={hideCreateMarketplaceModal}
            >
              <MarketplaceScreenEdit
                itemsForDeletion={itemsForDeletion}
                operation={operation}
                documents={images}
                onCancel={hideCreateMarketplaceModal}
                onRemoveDocument={handleRemoveDocument}
              ></MarketplaceScreenEdit>
            </MarketplaceModal>
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

export default ViewMarketplacePage;
