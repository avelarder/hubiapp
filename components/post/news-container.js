import React, { useState } from "react";
import { useRouter } from "next/router";

import Firebase from "../../firebase";
import TableSection from "../common/table-section";
import DeleteModal from "../common/delete-modal";
import useFirestoreQuery from "../../hooks/useFirestoreQuery";

const DEFAULT_LIMIT = 10;

const initCommunityNews = {
  headers: [
    { source: "title", columnName: "Título", isLink: true, path: "posts/" },
    { source: "publishedOn", columnName: "Publicado" },
    { source: "expiresBy", columnName: "Expiración" },
  ],
  data: [],
};

function NewsContainer() {
  const router = useRouter();
  const db = Firebase.default.firestore();
  let communityNews = {};


  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [currentLimit, setCurrentLimit] = useState(DEFAULT_LIMIT);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_LIMIT);


  const query = db.collection("CommunityNews").limit(rowsPerPage);

  const { data, status, error } = useFirestoreQuery(query);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center w-full bg-purple-100 h-10 text-xs text-purple-500">
        Los datos se están cargando, un momento por favor.
      </div>
    );
  }
  if (status === "error") {
    return `Error: ${error.message}`;
  }

  if (data) {
    var currentDocs = data.map((doc) => ({
      id: doc.id,
      title: doc.title,
      publishedOn: doc.publishedOn,
      expiresBy: doc.expiresBy ?? "--",
    }));

    communityNews = { ...initCommunityNews, data: currentDocs };
  }

  const handleViewClicked = (id) => {
    router.push(`/app/posts/${id}`);
  };

  const handleEditClicked = (id) => {
    alert("Under construction!");
  };

  const handleDeleteClicked = (id) => {
    setShowDeleteModal(true);
    setPostToDelete(id);
  };

  const handleDeleteConfirmation = async () => {
    await db
      .collection("CommunityNews")
      .doc(postToDelete)
      .delete();
    setShowDeleteModal(false);
  };

  const handleShowMoreNewsClicked = () => {
    setRowsPerPage((prev) => prev + currentLimit);
  };

  const handleChangeLimit = (limit) => {
    setCurrentLimit(limit);
    setRowsPerPage(limit);
  };

  return (
    <div>
      {communityNews.data && (
        <div>
          <TableSection
            key={new Date().getTime()}
            sectionTitle="Avisos"
            dataset={communityNews}
            currentLimit={currentLimit}
            onView={handleViewClicked}
            onEidt={handleEditClicked}
            onDelete={handleDeleteClicked}
            onShowMore={handleShowMoreNewsClicked}
            onChangeLimit={handleChangeLimit}
          ></TableSection>
        </div>
      )}
      {showDeleteModal && (
        <DeleteModal
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirmation}
        ></DeleteModal>
      )}
    </div>
  );
}

export default NewsContainer;
