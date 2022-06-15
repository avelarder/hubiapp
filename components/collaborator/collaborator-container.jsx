import React, { useState } from "react";
import { useRouter } from "next/router";
import Firebase from "../../firebase";
import TableSection from "../common/table-section";
import DeleteModal from "../common/delete-modal";
import useFirestoreQuery from "../../hooks/useFirestoreQuery";
import FieldContainer from "../common/field-container";
import Select from "../common/select";
import RoundedInputText from "../common/roundedInputText";
import { PlusIcon, AdjustmentsIcon } from "@heroicons/react/solid";
import moment from "moment";
import OffCanvas from "../common/OffCanvas";
import { StyledButton } from "../admin/base-ui-components";

const DEFAULT_LIMIT = 10;

function CollaboratorContainer({ onCreateClicked, onAccessClicked }) {
  const router = useRouter();
  const db = Firebase.default.firestore();
  let collaborators = {};

  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [collaboratorToDelete, setEmployeeToDelete] = useState(null);
  const [currentLimit, setCurrentLimit] = useState(DEFAULT_LIMIT);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_LIMIT);
  const [isOrderDirectionDesc, setOrderDirection] = useState(false);
  const [orderField, setOrderField] = useState("fullName");
  const [filterText, setFilterText] = useState("");
  const [filterEmployee, setFilterEmployee] = useState("");
  const [statusFilter, setStatusFilter] = useState({
    id: "ALL",
    text: "ESTADOS: Todos",
  });
  const [roleFilter, setRoleFilter] = useState({
    id: "ALL",
    text: "ROLES: Todos",
  });
  const [locationsFilter, setLocationsFilter] = useState({
    id: "ALL",
    text: "Todas",
  });

  const handleShowOffCanvas = (rowId) => {
    setSelectedEmployee(collaborators.data.find((x) => x.id === rowId));
    setShowOffCanvas(true);
  };

  const initCollaborators = {
    headers: [
      {
        source: "fullName",
        columnName: "Colaboradores",
        isLink: true,
        path: (id) => `collaboradores/${id}/detalle`,
        onClick: (e, id) => {
          e.preventDefault();
          handleShowOffCanvas(id);
        },
        isDate: false,
      },
      { source: "collaboratorTypeText", columnName: "Rol", isDate: false },
      { source: "access", columnName: "Accesos", isDate: false },
    ],
    data: [],
  };

  const handleStatusFilterChanged = (value) => {
    setStatusFilter(value);
  };
  const handleLocationsFilterChanged = (value) => {
    setLocationsFilter(value);
  };

  const handleRoleFilterChanged = (value) => {
    setRoleFilter(value);
  };

  const query = db
    .collection("Collaborators")
    .orderBy(orderField, "desc")
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
    var collaboratorsData = data.map((doc) => ({
      id: doc.id,
      fullName: doc.fullName,
      firstName: doc.firstName,
      lastName: doc.lastName,
      address: doc.address,
      phoneArea: doc.phoneArea.text,
      phone: doc.phone,
      email: doc.email,
      documentId: doc.documentId,
      documentType: doc.documentType.text,
      role: doc.collaboratorType,
      collaboratorTypeText: doc.collaboratorTypeText,
      access: "--",
      createdOnUTC: moment(doc.createdOnUTC, true).format("DD/MM/YYYY"),
    }));

    collaborators = { ...initCollaborators, data: collaboratorsData };
  }

  const handleViewClicked = (id) => {
    router.push(`/app/colaboradores/${id}/detalle`);
  };

  const handleEditClicked = (id) => {
    router.push(`/app/colaboradores/${id}/editar`);
  };

  const handleDeleteClicked = (id) => {
    setShowDeleteModal(true);
    setEmployeeToDelete(id);
  };

  const handleDeleteConfirmation = async () => {
    await db
      .collection("Collaborators")
      .doc(collaboratorToDelete)
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
      {collaborators.data && (
        <div>
          <TableSection
            sectionTitle="Colaboradores"
            dataset={collaborators}
            currentLimit={currentLimit}
            isOrderDesc={isOrderDirectionDesc}
            orderField={orderField}
            filterPost={filterEmployee}
            onShowOffCanvas={handleShowOffCanvas}
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
                  <div className="w-60 mr-2 ">
                    <Select
                      options={[
                        { id: "ALL", text: "ESTADOS: Todos" },
                        { id: "ACTIVE", text: "Activos" },
                        { id: "INACTIVE", text: "Inactivos" },
                      ]}
                      selectedOption={statusFilter}
                      onOptionChanged={handleStatusFilterChanged}
                    ></Select>
                  </div>
                  <div className="w-40 ">
                    <Select
                      options={[
                        { id: "ALL", text: "ROLES: Todos" },
                        {
                          id: "ADMINISTRATOR",
                          text: "Administrador",
                        },
                        {
                          id: "CONSERGE",
                          text: "Conserje",
                        },
                        {
                          id: "SUPERVISOR",
                          text: "Supervisor",
                        },
                      ]}
                      selectedOption={roleFilter}
                      onOptionChanged={handleRoleFilterChanged}
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
                      onAccessClicked();
                    }}
                  >
                    <AdjustmentsIcon className="w-5 h-5 mr-2 font-monse"></AdjustmentsIcon>
                    Accesos
                  </StyledButton>

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
          <OffCanvas
            showSidebar={showOffCanvas}
            setShowSidebar={setShowOffCanvas}
          >
            <div className="flex flex-col py-10 px-10 bg-white text-black border-1 rounded-lg border-purple-300">
              <h3 className="flex  text-2xl font-semibold text-black justify-center text-center">
                Información del Colaborador
              </h3>

              <FieldContainer title={"Nombres"}>
                <span className="ml-4">{selectedEmployee.firstName}</span>
              </FieldContainer>
              <FieldContainer title={"Apellidos"}>
                <span className="ml-4">{selectedEmployee.lastName}</span>
              </FieldContainer>

              <FieldContainer title={"Email"}>
                <span className="ml-4">{selectedEmployee.email}</span>
              </FieldContainer>

              <FieldContainer title={"Dirección"}>
                <span className="ml-4">{selectedEmployee.address}</span>
              </FieldContainer>

              <FieldContainer title={"Teléfono"}>
                <span className="ml-4">{`${selectedEmployee.phoneArea} ${selectedEmployee.phone}`}</span>
              </FieldContainer>
              <FieldContainer title={"DOC. IDENTIDAD"}>
                <span className="ml-4">{`${selectedEmployee.documentType} ${selectedEmployee.documentId}`}</span>
              </FieldContainer>
            </div>
            <div className="h-5"></div>
            <div className="flex flex-col py-10 px-10 bg-white text-black border-1 rounded-lg border-purple-300">
              <h3 className="flex  text-2xl font-semibold text-black justify-center text-center">
                Accesos
              </h3>

              <FieldContainer title={"Role"}>
                <span className="ml-4">Conserje</span>
              </FieldContainer>
              <FieldContainer title={"Tipo de Accesos"}>
                <ul className="list-disc ml-4">
                  <li>Web</li>
                  <li>Movil</li>
                </ul>
              </FieldContainer>

              <FieldContainer title={"Password Movil"}>
                <span className="ml-4">1234</span>
              </FieldContainer>
            </div>
            <div className="flex justify-end text-white text-md font-bold  mt-8 ">
              <button
                className=" w-64 bg-purple-600 h-10 shadow-md rounded-md "
                onClick={() => handleEditClicked(selectedEmployee.id)}
              >
                Editar
              </button>
            </div>
          </OffCanvas>
        </div>
      )}
      {showDeleteModal && (
        <DeleteModal
          title={"Eliminar colaborador?"}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirmation}
        ></DeleteModal>
      )}
    </div>
  );
}

export default CollaboratorContainer;
