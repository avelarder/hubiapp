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

const DEFAULT_LIMIT = 10;

function EmployeesContainer({ onCreateClicked, onAccessClicked }) {
  const router = useRouter();
  const db = Firebase.default.firestore();
  let employees = {};

  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [currentLimit, setCurrentLimit] = useState(DEFAULT_LIMIT);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_LIMIT);
  const [isOrderDirectionDesc, setOrderDirection] = useState(false);
  const [orderField, setOrderField] = useState("fullName");
  const [filterText, setFilterText] = useState("");
  const [filterEmployee, setFilterEmployee] = useState("");
  const [statusFilter, setStatusFilter] = useState({
    id: "ALL",
    text: "Todos",
  });
  const [roleFilter, setRoleFilter] = useState({
    id: "ALL",
    text: "Todos",
  });
  const [locationsFilter, setLocationsFilter] = useState({
    id: "ALL",
    text: "Todas",
  });

  const handleShowOffCanvas = (rowId) => {
    setSelectedEmployee(employees.data.find((x) => x.id === rowId));
    setShowOffCanvas(true);
  };

  const initEmployees = {
    headers: [
      {
        source: "fullName",
        columnName: "Empleados",
        isLink: true,
        path: (id) => `empleados/${id}/detalle`,
        onClick: (e, id) => {
          e.preventDefault();
          handleShowOffCanvas(id);
        },
        isDate: false,
      },
      { source: "employeeTypeText", columnName: "Rol", isDate: false },
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
    .collection("Employees")
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
    var employeesData = data.map((doc) => ({
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
      role: doc.employeeType,
      employeeTypeText: doc.employeeTypeText,
      access: "--",
      createdOnUTC: moment(doc.createdOnUTC, true).format("DD/MM/YYYY"),
    }));

    employees = { ...initEmployees, data: employeesData };
  }

  const handleViewClicked = (id) => {
    router.push(`/app/empleados/${id}/detalle`);
  };

  const handleEditClicked = (id) => {
    router.push(`/app/empleados/${id}/editar`);
  };

  const handleDeleteClicked = (id) => {
    setShowDeleteModal(true);
    setEmployeeToDelete(id);
  };

  const handleDeleteConfirmation = async () => {
    await db
      .collection("Employees")
      .doc(employeeToDelete)
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
      {employees.data && (
        <div>
          <TableSection
            sectionTitle="Empleados"
            dataset={employees}
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
                <div className="flex  mx-1 justify-around ">
                  <div className="flex flex-col w-40 mr-2 self-end xs:hidden">
                    <Select
                      title={"Estado"}
                      showTitle
                      options={[
                        { id: "ALL", text: "Todos" },
                        { id: "ACTIVE", text: "Activos" },
                        { id: "INACTIVE", text: "Inactivos" },
                      ]}
                      selectedOption={statusFilter}
                      onOptionChanged={handleStatusFilterChanged}
                    ></Select>
                  </div>
                  <div className="flex flex-col w-40 mr-2 self-end">
                    <Select
                      title={"Locaciones"}
                      showTitle
                      options={[
                        { id: "ALL", text: "Todas" },
                        {
                          id: "06481e68-ff8b-4621-a3e8-4d2f9002e7cb",
                          text: "Floresta",
                        },
                        {
                          id: "bde9ca06-053b-4cb3-8fc3-89802c05134d",
                          text: "Matellini",
                        },
                      ]}
                      selectedOption={locationsFilter}
                      onOptionChanged={handleLocationsFilterChanged}
                    ></Select>
                  </div>
                  <div className="flex flex-col w-40 self-end">
                    <Select
                      title={"Role"}
                      showTitle
                      options={[
                        { id: "ALL", text: "Todos" },
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
                  <div className="flex flex-col w-80 self-end ml-2 ">
                    <RoundedInputText
                      value={filterText}
                      onChange={(e) => setFilterText(e.currentTarget.value)}
                      placeholder="Ingrese el texto a buscar"
                    ></RoundedInputText>
                  </div>
                  <div className="flex justify-start align-top content-start ml-10">
                    <div className="flex align-bottom">
                      <button
                        className="w-full inline-flex justify-center self-end  rounded-xl border px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700 sm:text-sm  md:mx-1 sm:w-40 h-10 shadow-sm"
                        onClick={() => {
                          onAccessClicked();
                        }}
                      >
                        <AdjustmentsIcon className="w-5 h-5 mr-2 font-monse"></AdjustmentsIcon>
                        Accesos
                      </button>
                    </div>
                    <div className="flex align-bottom">
                      <button
                        className="w-full inline-flex self-end justify-center rounded-xl border px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700 sm:text-sm  md:mx-1 sm:w-40 h-10 shadow-sm"
                        onClick={() => {
                          onCreateClicked();
                        }}
                      >
                        <PlusIcon className="w-5 h-5 mr-2 font-monse"></PlusIcon>
                        Crear
                      </button>
                    </div>
                  </div>
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
                Información del Empleado
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
          title={"Eliminar empleado?"}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirmation}
        ></DeleteModal>
      )}
    </div>
  );
}

export default EmployeesContainer;
