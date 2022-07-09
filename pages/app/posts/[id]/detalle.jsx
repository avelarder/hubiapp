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
import PostModal from "../../../../components/post/create-post";
import PostNewsScreenEdit from "../../../../components/post/post-news-screen-edit";

function ViewPostPage() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [images, setImages] = useState([]);
  const router = useRouter();
  const { query } = router;
  const [itemsForDeletion, setItemsForDeletion] = useState([]);

  const id = query.id;

  const db = Firebase.default.firestore();
  let post = {};

  const defaultButton = useRef(null);

  const {
    data: dataPost,
    status: statusPost,
    error: errorPost,
  } = useFirestoreQuery(db.collection("Publications").doc(id));

  const {
    data: dataDocuments,
    status: statusDocuments,
    error: errorDocuments,
  } = useFirestoreQuery(
    db.collection("Publication_Documents").where("postId", "==", id ?? "")
  );

  useEffect(() => {
    if (dataDocuments) {
      setImages(dataDocuments.map((document) => document));
    }
    return () => {};
  }, [dataDocuments]);

  if (statusPost === "loading") {
    return <Loader></Loader>;
  }
  if (statusPost === "error") {
    return `Error: ${error.message}`;
  }
  if (dataPost === null) {
    return <Loader></Loader>;
  }
  if (dataPost) {
    post = {
      id: dataPost.id,
      description: dataPost.description,
      hasSurvey: dataPost.hasSurvey,
      hasSchedule: dataPost.hasSchedule,
      author: dataPost.author,
      createdOnUTC: dataPost.createdOnUTC,
      location: dataPost.location,
      schedule: dataPost.schedule,
      surveyAllowAddOption: dataPost.surveyAllowAddOption,
      surveyAnswerType: dataPost.surveyAnswerType,
      surveyExpiration: dataPost.surveyExpiration,
      updatedOnUTC: dataPost.updatedOnUTC,
      surveyOptions: dataPost.surveyOptions,
    };
  }

  const handleEditClicked = async (event) => {
    setShowCreatePost(true);
  };

  const handleBack = () => {
    router.back();
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };
  const handleDeleteConfirmation = async () => {
    await db.collection("Publications").doc(id).delete();
    setShowDeleteModal(false);
    router.push("/app/comunidad");
  };
  const hideCreatePostModal = () => {
    setItemsForDeletion([]);
    setShowCreatePost(false);
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
                    Detalle de Publicación
                  </h1>
                </section>
                <section>
                  <div className="flex items-center ">
                    <div className="w-full">
                      <FieldContainer>
                        <RoundedLabel
                          label={`Descripción`}
                          value={post.description}
                        ></RoundedLabel>
                      </FieldContainer>
                      <FieldContainer>
                        <RoundedLabel
                          label={`Fecha de Registro`}
                          value={moment(post.createdOnUTC, true).format(
                            "DD/MM/YYYY"
                          )}
                        ></RoundedLabel>
                      </FieldContainer>
                    </div>
                  </div>
                </section>
                {post.hasSchedule && (
                  <section>
                    <div className="flex flex-col border-1 border-gray-100 rounded-lg p-4 mt-4 ">
                      <span className="flex text-gray-400 text-xs my-2 font-bold">
                        Esta publicación tiene programación
                      </span>
                      <div className="w-full">
                        <FieldContainer>
                          <RoundedLabel
                            label={`Fecha en la que esta publicación estará disponible`}
                            value={moment(post.schedule, true).format(
                              "DD/MM/YYYY"
                            )}
                          ></RoundedLabel>
                        </FieldContainer>
                      </div>
                    </div>
                  </section>
                )}
                {post.hasSurvey && (
                  <section>
                    <div className="flex flex-col border-1 border-gray-100 rounded-lg p-4 mt-4 ">
                      <span className="flex text-gray-400 text-xs my-2 font-bold">
                        Detalle de la Encuesta
                      </span>
                      <div className="w-full">
                        <FieldContainer>
                          <RoundedLabel
                            label={`Esta encuesta permite agregar opciones?`}
                            value={post.surveyAllowAddOption ? "Si" : "No"}
                          ></RoundedLabel>
                        </FieldContainer>
                        <FieldContainer>
                          <RoundedLabel
                            label={`Esta encuesta permite seleccionar más de una opción?`}
                            value={post.surveyAnswerType.text}
                          ></RoundedLabel>
                        </FieldContainer>
                        <FieldContainer>
                          <RoundedLabel
                            label={`Esta encuesta expira:`}
                            value={post.surveyExpiration}
                          ></RoundedLabel>
                        </FieldContainer>
                        <div className="flex flex-wrap border-1 border-gray-100 rounded-lg p-4 mt-4">
                          <span className="flex text-gray-400 text-xs font-bold my-2">
                            Estas son las opciones de la encuesta:
                          </span>
                          {post.surveyOptions.map((option, i) => (
                            <FieldContainer key={option.key}>
                              <RoundedLabel
                                label={`Opción ${i + 1}`}
                                value={option.text}
                              ></RoundedLabel>
                            </FieldContainer>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                )}
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
          {showCreatePost && (
            <PostModal
              title={"Modificar Publicación"}
              onCancel={hideCreatePostModal}
            >
              <PostNewsScreenEdit
                itemsForDeletion={itemsForDeletion}
                post={post}
                documents={images}
                onCancel={hideCreatePostModal}
                onRemoveDocument={handleRemoveDocument}
              ></PostNewsScreenEdit>
            </PostModal>
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

export default ViewPostPage;
