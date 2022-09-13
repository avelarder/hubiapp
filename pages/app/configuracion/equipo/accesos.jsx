import { Switch } from "@headlessui/react";
import React, { useEffect, useMemo, useState } from "react";
import FieldContainer from "../../../../components/common/field-container";
import Select from "../../../../components/common/select";
import NewLayout from "../../../../components/newLayout";
import { collaboratorTypeOptions } from "../../../../utils/UI-Constants";
import { useLocationContext } from "../../../../locationProvider";
import Firebase from "../../../../firebase";
import useFirestoreQuery from "../../../../hooks/useFirestoreQuery";

function AccessToggleSection({ title, description, toggleState, onToggle }) {
  const [toggle, setToggle] = useState(toggleState);

  const handleToggle = (value) => {
    setToggle(value);
    onToggle(value);
  };

  return (
    <FieldContainer>
      <div className="flex flex-col  border-1 border-gray-400 my-4 rounded-lg ">
        <div className="flex items-center ">
          <div className="flex flex-col w-3/4 p-4">
            <span className="font-bold ">{title}</span>
            <span className="text-sm">{description}</span>
          </div>
          <div className="w-1/4 justify-end items-end">
            <Switch
              checked={toggle}
              onChange={handleToggle}
              className={`${toggle ? "bg-purple-900" : "bg-purple-200"}
          relative inline-flex flex-shrink-0 h-5 w-10 border-1 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span
                aria-hidden="true"
                className={`${toggle ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
              />
            </Switch>
          </div>
        </div>
      </div>
    </FieldContainer>
  );
}

function AccessOptionItem({ option }) {
  const db = Firebase.default.firestore();
  const [optionItem, setOptionItem] = useState(null);

  useEffect(() => {
    option.onSnapshot((response) => {
      setOptionItem(
        response.exists === true
          ? { id: response.id, ...response.data() }
          : null
      );
    });
    return () => {
      setOptionItem(null);
    };
  }, [setOptionItem, option]);

  const handleOptionChanged = async (option, newValue) => {
    await db.collection("AccessProfileOptions").doc(option.id).update({
      enabled: newValue,
    });
  };

  return (
    <>
      {optionItem ? (
        <>
          <div key={optionItem.index} className="flex gap-2 items-center px-4">
            <input
              type={"checkbox"}
              onChange={() =>
                handleOptionChanged(optionItem, !optionItem.enabled)
              }
              checked={optionItem.enabled}
            />
            <span>{optionItem.title}</span>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}

function AccessOptionsSection({ children }) {
  return (
    <div className="flex flex-col  border-1 border-gray-400 my-4 rounded-lg ">
      <FieldContainer>
        <div className="flex flex-col items-start border-1 border-gray-300 m-4 p-4 rounded-lg bg-gray-50 text-sm ">
          {children}
        </div>
      </FieldContainer>
    </div>
  );
}

function AccessPage() {
  const db = Firebase.default.firestore();
  const { locationSelected } = useLocationContext();

  const [collaboratorType, setCollaboratorType] = useState(
    collaboratorTypeOptions[0]
  );

  const queryProfiles = db
    .collection("AccessProfiles")
    .where("locationId", "==", locationSelected.id ?? "");

  const {
    data: dataProfiles,
    status: statusProfiles,
    error,
  } = useFirestoreQuery(queryProfiles);

  const handleMobileAccess = async (value) => {
    const accessProfile = localDataProfiles.find(
      (x) => x.role == collaboratorType.id
    );
    await db.collection("AccessProfiles").doc(accessProfile.id).update({
      mobileAccess: value,
    });
  };
  const handleDashboardAccess = async (value) => {
    const accessProfile = localDataProfiles.find(
      (x) => x.role == collaboratorType.id
    );
    await db.collection("AccessProfiles").doc(accessProfile.id).update({
      dashboardAccess: value,
    });
  };
  const handleDesktopdAccess = async (value) => {
    const accessProfile = localDataProfiles.find(
      (x) => x.role == collaboratorType.id
    );
    await db.collection("AccessProfiles").doc(accessProfile.id).update({
      desktopAccess: value,
    });
  };

  const localDataProfiles = useMemo(() => {
    return dataProfiles;
  }, [dataProfiles]);

  if (statusProfiles === "loading") {
    return (
      <div className="flex justify-center items-center w-full bg-purple-100 h-10 text-xs text-purple-500">
        Los datos se están cargando, un momento por favor.
      </div>
    );
  }

  if (statusProfiles === "error") {
    return `Error: ${error.message}`;
  }

  const handleCollaborationTypeChanged = (value) => {
    setCollaboratorType(value);
  };

  return (
    <NewLayout>
      <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-8 mx-auto">
        <div className="flex flex-col justify-center">
          <span className="font-bold text-2xl">Información del Acceso</span>
          <FieldContainer>
            <div className="flex items-center ">
              <div className="w-2/4">
                <span className="bg-gray-100 p-4">Nombre del Rol</span>
              </div>
              <div className="w-2/4  ml-2">
                <Select
                  options={collaboratorTypeOptions}
                  selectedOption={collaboratorType}
                  onOptionChanged={handleCollaborationTypeChanged}
                ></Select>
              </div>
            </div>
          </FieldContainer>
        </div>
        {localDataProfiles?.length > 0 &&
          localDataProfiles.find((x) => x.role == collaboratorType.id) && (
            <div className="flex flex-col justify-center mt-8">
              <span className="font-bold text-2xl">Permisos</span>
              <AccessToggleSection
                title={"Acceso a Hubi desde el celular"}
                description={
                  "Permite a los empleados tengan acceso con su password de 4 dígitos desde su móvil."
                }
                onToggle={handleMobileAccess}
                key={"movileAccess"}
                toggleState={
                  localDataProfiles.find((x) => x.role == collaboratorType.id)
                    .mobileAccess
                }
              ></AccessToggleSection>
              <AccessToggleSection
                title={"Acceso a Hubi desde el escritorio (desktop)"}
                description={
                  " Permite a los empleados tengan acceso con su password de 4 dígitos desde su computador."
                }
                onToggle={handleDesktopdAccess}
                key={"desktopAccess"}
                toggleState={
                  localDataProfiles.find((x) => x.role == collaboratorType.id)
                    .desktopAccess
                }
              ></AccessToggleSection>
              <AccessToggleSection
                title={"Acceso al dashboard"}
                description={
                  " Permite a los empleados tengan acceso con su password de 4 dígitos desde su computador."
                }
                onToggle={handleDashboardAccess}
                key={"dashboardAccess"}
                toggleState={
                  localDataProfiles.find((x) => x.role == collaboratorType.id)
                    .dashboardAccess
                }
              ></AccessToggleSection>
              <AccessOptionsSection>
                {localDataProfiles
                  .find((x) => x.role == collaboratorType.id)
                  .options.map((x, index) => {
                    return (
                      <AccessOptionItem
                        key={index}
                        option={x}
                      ></AccessOptionItem>
                    );
                  })}
              </AccessOptionsSection>
            </div>
          )}
      </div>
    </NewLayout>
  );
}

export default AccessPage;
