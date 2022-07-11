import React, { useState } from "react";
import { useRouter } from "next/router";
import Firebase from "../firebase";
import TableSection from "./common/table-section";
import DeleteModal from "./common/delete-modal";
import useFirestoreQuery from "../hooks/useFirestoreQuery";

function ListContainer({
  handleViewClicked,
  tableStructure,
  rowLimit,
  firebaseQuery,
  mapResolver,
  handleRowClicked,
  handleDeleteConfirmation,
  sortingColumn,
  sectionTitle,
}) {
  const router = useRouter();
  const db = Firebase.default.firestore();
  let communityEvents = {};

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [currentLimit, setCurrentLimit] = useState(rowLimit);
  const [rowsPerPage, setRowsPerPage] = useState(rowLimit);
  const [isOrderDirectionDesc, setOrderDirection] = useState(false);
  const [orderField, setOrderField] = useState(sortingColumn);

  const [filterPost, setFilterPost] = useState("");

  const query = firebaseQuery(db, orderField, rowsPerPage);

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
    var currentDocs = data.map((doc) => mapResolver(doc));
    communityEvents = { ...tableStructure, data: currentDocs };
  }

  const handleDeleteClicked = (id) => {
    setShowDeleteModal(true);
    setPostToDelete(id);
  };

  const onDeleteConfirmation = async () => {
    await handleDeleteConfirmation(db, postToDelete);
    setShowDeleteModal(false);
  };

  const handleShowMoreNewsClicked = () => {
    setRowsPerPage((prev) => prev + currentLimit);
  };

  const handleChangeLimit = (limit) => {
    setCurrentLimit(limit);
    setRowsPerPage(limit);
  };

  const onViewClicked = (id) => {
    handleViewClicked(router, id);
  };

  const onRowClicked = (id) => {
    handleRowClicked(router, id);
  };

  const handleOrderByFieldChanged = (field) => {
    let localDirection;
    if (field === orderField) localDirection = !isOrderDirectionDesc;
    else {
      setOrderField(field);
      localDirection = false;
    }
    setOrderDirection(localDirection);
  };

  return (
    <div>
      {communityEvents.data && (
        <div>
          <TableSection
            sectionTitle={sectionTitle}
            dataset={communityEvents}
            currentLimit={currentLimit}
            isOrderDesc={isOrderDirectionDesc}
            orderField={orderField}
            filterPost={filterPost}
            onView={onViewClicked}
            onDelete={handleDeleteClicked}
            onShowMore={handleShowMoreNewsClicked}
            onChangeLimit={handleChangeLimit}
            onOrderByFieldChanged={handleOrderByFieldChanged}
            onFilterPostChanged={setFilterPost}
            onRowIsClicked={onRowClicked}
          ></TableSection>
        </div>
      )}
      {showDeleteModal && (
        <DeleteModal
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={onDeleteConfirmation}
        ></DeleteModal>
      )}
    </div>
  );
}

export default ListContainer;
