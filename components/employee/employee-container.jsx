import React, { useState } from "react";
import { useRouter } from "next/router";
import Firebase from "../../firebase";
import TableSection from "../common/table-section";
import DeleteModal from "../common/delete-modal";
import useFirestoreQuery from "../../hooks/useFirestoreQuery";
import FieldContainer from "../common/field-container";
import Select from "../common/select";
import RoundedInputText from "../common/RoundedInputText";
import { VALIDATIONS } from "../../utils/UI-Constants";

const DEFAULT_LIMIT = 10;

const initEmployees = {
  headers: [
    {
      source: "name",
      columnName: "Empleados",
      isLink: true,
      path: (id) => `empleados/${id}/detalle`,
    },
    { source: "role", columnName: "Rol", isDate: false },
    { source: "access", columnName: "Accesos", isDate: false },
  ],
  data: [],
};

function EmployeesContainer() {
  const router = useRouter();
  const db = Firebase.default.firestore();
  let employees = {};

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [currentLimit, setCurrentLimit] = useState(DEFAULT_LIMIT);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_LIMIT);
  const [isOrderDirectionDesc, setOrderDirection] = useState(false);
  const [orderField, setOrderField] = useState("publishedOn");
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
    var currentDocs = data.map((doc) => ({
      id: doc.id,
      name: doc.name,
      role: doc.role,
      access: doc.accessType ?? "--",
    }));

    employees = { ...initEmployees, data: currentDocs };
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
            onView={handleViewClicked}
            onEdit={handleEditClicked}
            onDelete={handleDeleteClicked}
            onShowMore={handleShowMoreNewsClicked}
            onChangeLimit={handleChangeLimit}
            onOrderByFieldChanged={handleOrderByFieldChanged}
            onFilterPostChanged={setFilterEmployee}
            filteringOptions={
              <FieldContainer>
                <div className="flex mx-1 justify-around">
                  <div className="flex flex-col w-40 mr-2 self-end">
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
                </div>
              </FieldContainer>
            }
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

export default EmployeesContainer;
