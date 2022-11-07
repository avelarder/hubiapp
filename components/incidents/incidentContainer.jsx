import { PlusIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { StyledButton } from "../admin/base-ui-components";
import DeleteModal from "../common/delete-modal";
import FieldContainer from "../common/field-container";
import Firebase from "../../firebase";
import RoundedInputText from "../common/roundedInputText";
import Select from "../common/select";
import TableSection from "../common/table-section";
import { useLocationContext } from "../../locationProvider";
import { useAuth } from "../../authUserProvider";
import useFirestoreQuery from "../../hooks/useFirestoreQuery";
import { incidentOptions } from "../../utils/UI-Constants";

const DEFAULT_LIMIT = 10;

function IncidentContainer({ onCreateClicked }) {
  const router = useRouter();
  const { locationSelected } = useLocationContext();
  const { authUser, loading } = useAuth();
  const db = Firebase.default.firestore();
  let incidents = {};

  const initIncidents = {
    headers: [
      {
        source: "title",
        columnName: "Incidente",
        isLink: true,
        path: (id) => `seguridad/${id}/detalle`,
        onClick: (e, id) => {
          e.preventDefault();
          router.push(`seguridad/${id}/detalle`);
        },
        isDate: false,
      },
      { source: "createdBy", columnName: "Creado por", isDate: true },
      { source: "createdOn", columnName: "Fecha creación", isDate: false },
      { source: "incidentDate", columnName: "Ocurrencia", isDate: true },
    ],
    data: [],
  };
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [incidentToDelete, setIncidentToDelete] = useState(null);
  const [currentLimit, setCurrentLimit] = useState(DEFAULT_LIMIT);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_LIMIT);
  const [isOrderDirectionDesc, setOrderDirection] = useState(false);
  const [orderField, setOrderField] = useState("title");
  const [filterText, setFilterText] = useState("");
  const [filterEmployee, setFilterEmployee] = useState("");
  const [incidentTypeFilter, setIncidentTypeFilter] = useState({
    id: "ALL",
    text: "TIPO: Todos",
  });

  const handleViewClicked = (id) => {
    router.push(`/app/seguridad/${id}/detalle`);
  };

  const handleEditClicked = (id) => {
    router.push(`/app/seguridad/${id}/editar`);
  };

  const handleDeleteClicked = (id) => {
    setShowDeleteModal(true);
    setEmployeeToDelete(id);
  };

  const handleDeleteConfirmation = async () => {
    await db.collection("Incidents").doc(incidentToDelete).delete();
    setShowDeleteModal(false);
  };

  const handleShowMoreNewsClicked = () => {
    setRowsPerPage((prev) => prev + currentLimit);
  };

  const handleChangeLimit = (limit) => {
    setCurrentLimit(limit);
    setRowsPerPage(limit);
  };

  const handleIncidentTypeFilterChanged = (value) => {
    setIncidentTypeFilter(value);
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

  const query = db
    .collection("Incidents")
    .orderBy(orderField, "desc")
    .where("location", "==", locationSelected.id ?? "")
    .limit(rowsPerPage);

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
    var incidentsData = data.map((doc) => ({
      id: doc.id,
      title: doc.title,
      description: doc.description,
      incidentType: doc.incidentType,
      location: doc.location,
      documents: doc.documents,
      incidentDate: doc.incidentDate,
      createdBy: doc.createdBy,
      createdOn: doc.createdOn,
      verifiedBY: doc.verifiedBy,
      verifiedOn: doc.verifiedOn,
      deletedOn: doc.deletedOn,
      deletedBy: doc.deletedBy,
    }));

    incidents = { ...initIncidents, data: incidentsData };
  }

  return (
    <div>
      {incidents.data && (
        <div>
          <TableSection
            sectionTitle="Incidencias"
            dataset={incidents}
            currentLimit={currentLimit}
            isOrderDesc={isOrderDirectionDesc}
            orderField={orderField}
            filterPost={filterEmployee}
            onView={handleViewClicked}
            onEdit={handleEditClicked}
            onDelete={handleDeleteClicked}
            onShowMore={handleShowMoreNewsClicked}
            onChangeLimit={handleChangeLimit}
            onOrderByFieldChanged={handleOrderByFieldChanged}
            onFilterPostChanged={setFilterEmployee}
            filteringOptions={
              <FieldContainer>
                <div className="flex mx-1 justify-evenly items-center ">
                  <div className="w-40 ">
                    <Select
                      options={incidentOptions}
                      selectedOption={incidentTypeFilter}
                      onOptionChanged={handleIncidentTypeFilterChanged}
                    ></Select>
                  </div>
                  <div className="w-80 ml-2 ">
                    <RoundedInputText
                      value={filterText}
                      onChange={(e) => setFilterText(e.currentTarget.value)}
                      placeholder="Ingrese el texto a buscar"
                    ></RoundedInputText>
                  </div>

                  <StyledButton
                    className="w-full inline-flex justify-center self-end   px-4 py-2     sm:text-sm  md:mx-1 sm:w-40 h-10 "
                    onClick={() => {
                      onCreateClicked();
                    }}
                  >
                    <PlusIcon className="w-5 h-5 mr-2 font-monse"></PlusIcon>
                    Crear
                  </StyledButton>
                </div>
              </FieldContainer>
            }
          ></TableSection>
        </div>
      )}
      {showDeleteModal && (
        <DeleteModal
          title={"Eliminar incidente?"}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirmation}
        ></DeleteModal>
      )}
    </div>
  );
}

export default IncidentContainer;
