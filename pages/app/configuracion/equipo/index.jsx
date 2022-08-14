import { AdjustmentsIcon, PlusIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { useState } from "react";
import FieldContainer from "../../../../components/common/field-container";
import RoundedInputText from "../../../../components/common/roundedInputText";
import Select from "../../../../components/common/select";
import TableSection from "../../../../components/common/table-section";
import TabNavigator from "../../../../components/common/tabnavigator";
import Footer from "../../../../components/dashboard/footer";
import NewLayout from "../../../../components/newLayout";
import { handleOptionSelected } from "../../../../utils/UI-Constants";
import MainSection from "../../../../components/dashboard/mainSection";
import Firebase from "../../../../firebase";
import useFirestoreQuery from "../../../../hooks/useFirestoreQuery";
import moment from "moment";
import { StyledButton } from "../../../../components/admin/base-ui-components";

const DEFAULT_LIMIT = 10;

function TeamPage() {
  const router = useRouter();
  const db = Firebase.default.firestore();
  let collaborators = {};

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

  const initCollaborators = {
    headers: [
      {
        source: "fullName",
        columnName: "Colaboradores",
        isLink: true,
        path: (id) => `collaboradores/${id}/detalle`,
        onClick: (e, id) => {
          e.preventDefault();
        },
        isDate: false,
      },
      { source: "collaboratorTypeText", columnName: "Rol", isDate: false },
      { source: "access", columnName: "Accesos", isDate: false },
      { source: "phone", columnName: "Teléfono", isDate: false },
      { source: "email", columnName: "Correo", isDate: false },
    ],
    data: [],
  };

  const query = db
    .collection("Collaborators")
    .orderBy(orderField, "desc")
    .limit(rowsPerPage);

  const { data, status, error } = useFirestoreQuery(query);

  if (status === "loading") {
    return (
      <NewLayout>
        <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto">
          <MainSection>
            <div className="flex flex-col w-full">
              <div className="mt-2">
                <div className="flex justify-around ">
                  <TabNavigator
                    onOptionSelected={(option) =>
                      handleOptionSelected(option, router)
                    }
                    currentOptionIndex={3}
                  ></TabNavigator>
                </div>
              </div>
              <div className="flex justify-center items-center w-full bg-purple-100 h-10 text-xs text-purple-500">
                Los datos se están cargando, un momento por favor.
              </div>
            </div>
          </MainSection>
        </div>
      </NewLayout>
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

  const handleStatusFilterChanged = (value) => {
    setStatusFilter(value);
  };

  const handleRoleFilterChanged = (value) => {
    setRoleFilter(value);
  };

  const handleInviteClicked = () => {};
  const handleAccessClicked = () => {
    router.push("/app/configuracion/equipo/accesos");
  };

  return (
    <NewLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto">
        <MainSection>
          <div className="flex flex-col w-full">
            <div className="mt-2">
              <div className="flex justify-around ">
                <TabNavigator
                  onOptionSelected={(option) =>
                    handleOptionSelected(option, router)
                  }
                  currentOptionIndex={3}
                ></TabNavigator>
              </div>
            </div>
            <div>
              {collaborators.data && (
                <div className=" mt-16">
                  <TableSection
                    hideContextualMenu={true}
                    sectionTitle="Colaboradores"
                    dataset={collaborators}
                    currentLimit={currentLimit}
                    isOrderDesc={isOrderDirectionDesc}
                    orderField={orderField}
                    filterPost={filterEmployee}
                    onShowOffCanvas={() => {}}
                    onView={() => {}}
                    onEdit={() => {}}
                    onDelete={() => {}}
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
                              onChange={(e) =>
                                setFilterText(e.currentTarget.value)
                              }
                              placeholder="Ingrese el texto a buscar"
                            ></RoundedInputText>
                          </div>

                          <StyledButton
                            className="w-full inline-flex justify-center self-end   px-4 py-2     sm:text-sm  md:mx-1 sm:w-40 h-10 "
                            onClick={() => {
                              handleAccessClicked();
                            }}
                          >
                            <AdjustmentsIcon className="w-5 h-5 mr-2 font-monse"></AdjustmentsIcon>
                            Accesos
                          </StyledButton>

                          <StyledButton
                            className="w-full inline-flex justify-center self-end   px-4 py-2     sm:text-sm  md:mx-1 sm:w-40 h-10 "
                            onClick={() => {
                              handleInviteClicked();
                            }}
                          >
                            <PlusIcon className="w-5 h-5 mr-2 font-monse"></PlusIcon>
                            Invitar
                          </StyledButton>
                        </div>
                      </FieldContainer>
                    }
                  ></TableSection>
                </div>
              )}
            </div>
          </div>
        </MainSection>
        <div>
          <Footer></Footer>
        </div>
      </div>
    </NewLayout>
  );
}

export default TeamPage;
