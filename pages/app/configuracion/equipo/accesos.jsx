import { Switch } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import FieldContainer from "../../../../components/common/field-container";
import Select from "../../../../components/common/select";
import NewLayout from "../../../../components/newLayout";
import { collaboratorTypeOptions } from "../../../../utils/UI-Constants";
import { useLocationContext } from "../../../../locationProvider";
import Firebase from "../../../../firebase";
import useFirestoreQuery from "../../../../hooks/useFirestoreQuery";

function AccessToggleSection({
  title,
  description,
  toogleState,
  onToggle,
  options,
}) {
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
              checked={toogleState}
              onChange={onToggle}
              className={`${toogleState ? "bg-purple-900" : "bg-purple-200"}
          relative inline-flex flex-shrink-0 h-5 w-10 border-1 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span
                aria-hidden="true"
                className={`${toogleState ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
              />
            </Switch>
          </div>
        </div>
        {toogleState && (
          <FieldContainer>
            <div className="flex flex-col items-start border-1 border-gray-300 m-4 p-4 rounded-lg bg-gray-50 text-sm ">
              {options &&
                options.map((option, index) => (
                  <div key={index} className="flex gap-2 items-center px-4">
                    <input
                      type={"checkbox"}
                      onChange={option.onChange}
                      value={option.value}
                    />
                    <span>{option.title}</span>
                  </div>
                ))}
            </div>
          </FieldContainer>
        )}
      </div>
    </FieldContainer>
  );
}

function AccessPage() {
  const db = Firebase.default.firestore();
  const {
    locationSelected,
    availableLocations,
    setSelectedLocation,
    setAvailableLocations,
  } = useLocationContext();

  const [collaboratorType, setCollaboratorType] = useState(
    collaboratorTypeOptions[0]
  );
  const [movileAccessEnabled, setMovileAccessEnabled] = useState(false);
  const [desktopAccessEnabled, setDesktopAccessEnabled] = useState(false);
  const [dashboardAccessEnabled, setDashboardAccessEnabled] = useState(false);

  const query = db
    .collection("AccessProfiles")
    .where("locationId", "==", locationSelected.id ?? "");

  const { data, status, error } = useFirestoreQuery(query);

  useEffect(() => {
    if (data) {
      setMovileAccessEnabled(data[0]?.movileAccess);
      setDesktopAccessEnabled(data[0]?.desktopAccess);
      setDashboardAccessEnabled(data[0]?.dashboardAccess);
    }
  }, [
    data,
    setMovileAccessEnabled,
    setDesktopAccessEnabled,
    setDashboardAccessEnabled,
  ]);

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
                  onOptionChanged={setCollaboratorType}
                ></Select>
              </div>
            </div>
          </FieldContainer>
        </div>
        {data?.length > 0 && data[0].role == collaboratorType.id && (
          <div className="flex flex-col justify-center mt-8">
            <span className="font-bold text-2xl">Permisos</span>
            <AccessToggleSection
              title={"Acceso a Hubi desde el celular"}
              description={
                "Permite a los empleados tengan acceso con su password de 4 dígitos desde su móvil."
              }
              onToggle={setMovileAccessEnabled}
              key={"movileAccess"}
              toogleState={movileAccessEnabled}
              options={[
                {
                  title: "Option 1",
                  value: false,
                  onChange: () => {},
                },
                {
                  title: "Option 2",
                  value: false,
                  onChange: () => {},
                },
                {
                  title: "Option 3",
                  value: false,
                  onChange: () => {},
                },
              ]}
            ></AccessToggleSection>
            <AccessToggleSection
              title={"Acceso a Hubi desde el escritorio (desktop)"}
              description={
                " Permite a los empleados tengan acceso con su password de 4 dígitos desde su computador."
              }
              onToggle={setDesktopAccessEnabled}
              key={"desktopAccess"}
              toogleState={desktopAccessEnabled}
              options={[
                {
                  title: "Option 1",
                  value: false,
                  onChange: () => {},
                },
                {
                  title: "Option 2",
                  value: false,
                  onChange: () => {},
                },
                {
                  title: "Option 3",
                  value: false,
                  onChange: () => {},
                },
              ]}
            ></AccessToggleSection>
            <AccessToggleSection
              title={"Acceso al Dashboard"}
              description={
                "Permite a los empleados tengan acceso con su password de 4 dígitos desde su computador."
              }
              onToggle={setDashboardAccessEnabled}
              key={"dashboardAccess"}
              toogleState={dashboardAccessEnabled}
              options={[]}
            ></AccessToggleSection>
          </div>
        )}
      </div>
    </NewLayout>
  );
}

export default AccessPage;
