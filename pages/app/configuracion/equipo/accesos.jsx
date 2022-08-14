import { Switch } from "@headlessui/react";
import React, { useState } from "react";
import FieldContainer from "../../../../components/common/field-container";
import Select from "../../../../components/common/select";
import NewLayout from "../../../../components/newLayout";
import { collaboratorTypeOptions } from "../../../../utils/UI-Constants";

function AccessPage() {
  const [collaboratorType, setCollaboratorType] = useState(
    collaboratorTypeOptions[0]
  );
  const [movileAccessEnabled, setMovileAccessEnabled] = useState(false);

  const handleMovileAccess = (status) => {
    setMovileAccessEnabled(status);
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
                  onOptionChanged={setCollaboratorType}
                ></Select>
              </div>
            </div>
          </FieldContainer>
        </div>
        <div className="flex flex-col justify-center mt-8">
          <span className="font-bold text-2xl">Permisos</span>
          <FieldContainer>
            <div className="flex flex-col  border-1 border-gray-400 my-4 rounded-lg ">
              <div className="flex items-center ">
                <div className="flex flex-col w-3/4 p-4">
                  <span className="font-bold ">
                    Acceso a Hubi desde el celular
                  </span>
                  <span className="text-sm">
                    Permite a los empleados tengan acceso con su password de 4
                    dígitos desde su móvil.
                  </span>
                </div>
                <div className="w-1/4 justify-end items-end">
                  <Switch
                    checked={movileAccessEnabled}
                    onChange={handleMovileAccess}
                    className={`${
                      movileAccessEnabled ? "bg-purple-900" : "bg-purple-200"
                    }
          relative inline-flex flex-shrink-0 h-5 w-10 border-1 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        movileAccessEnabled ? "translate-x-5" : "translate-x-0"
                      }
            pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                    />
                  </Switch>
                </div>
              </div>
              <FieldContainer>
                <div className="flex flex-col items-start border-1 border-gray-300 m-4 p-4 rounded-lg bg-gray-50 text-sm ">
                  <div className="flex gap-2 items-center px-4">
                    <input type={"checkbox"} />
                    <span>Option 1</span>
                  </div>
                  <div className="flex gap-2 items-center px-4">
                    <input type={"checkbox"} />
                    <span>Option 2</span>
                  </div>
                  <div className="flex gap-2 items-center px-4">
                    <input type={"checkbox"} />
                    <span>Option 3</span>
                  </div>
                  <div className="flex gap-2 items-center px-4">
                    <input type={"checkbox"} />
                    <span>Option 4</span>
                  </div>
                  <div className="flex gap-2 items-center px-4">
                    <input type={"checkbox"} />
                    <span>Option 5</span>
                  </div>
                </div>
              </FieldContainer>
            </div>
          </FieldContainer>
          <FieldContainer>
            <div className="flex flex-col  border-1 border-gray-400 my-4 rounded-lg ">
              <div className="flex items-center ">
                <div className="flex flex-col w-3/4 p-4">
                  <span className="font-bold ">
                    Acceso a Hubi desde el escritorio (desktop)
                  </span>
                  <span className="text-sm">
                    Permite a los empleados tengan acceso con su password de 4
                    dígitos desde su computador.
                  </span>
                </div>
                <div className="w-1/4 justify-end items-end">
                  <Switch
                    checked={movileAccessEnabled}
                    onChange={handleMovileAccess}
                    className={`${
                      movileAccessEnabled ? "bg-purple-900" : "bg-purple-200"
                    }
          relative inline-flex flex-shrink-0 h-5 w-10 border-1 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        movileAccessEnabled ? "translate-x-5" : "translate-x-0"
                      }
            pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                    />
                  </Switch>
                </div>
              </div>
              <FieldContainer>
                <div className="flex flex-col items-start border-1 border-gray-300 m-4 p-4 rounded-lg bg-gray-50 text-sm">
                  <div className="flex gap-2 items-center px-4">
                    <input type={"checkbox"} />
                    <span>Option 1</span>
                  </div>
                  <div className="flex gap-2 items-center px-4">
                    <input type={"checkbox"} />
                    <span>Option 2</span>
                  </div>
                  <div className="flex gap-2 items-center px-4">
                    <input type={"checkbox"} />
                    <span>Option 3</span>
                  </div>
                  <div className="flex gap-2 items-center px-4">
                    <input type={"checkbox"} />
                    <span>Option 4</span>
                  </div>
                  <div className="flex gap-2 items-center px-4">
                    <input type={"checkbox"} />
                    <span>Option 5</span>
                  </div>
                </div>
              </FieldContainer>
            </div>
          </FieldContainer>
          <FieldContainer>
            <div className="flex flex-col  border-1 border-gray-400 my-4 rounded-lg drop-shadow-lg ">
              <div className="flex items-center ">
                <div className="flex flex-col w-3/4 p-4">
                  <span className="font-bold">Acceso al Dashboard</span>
                  <span className="text-sm">
                    Permite a los empleados tengan acceso con su password de 4
                    dígitos desde su computador.
                  </span>
                </div>
                <div className="w-1/4 justify-end items-end">
                  <Switch
                    checked={movileAccessEnabled}
                    onChange={handleMovileAccess}
                    className={`${
                      movileAccessEnabled ? "bg-purple-900" : "bg-purple-200"
                    }
          relative inline-flex flex-shrink-0 h-5 w-10 border-1 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        movileAccessEnabled ? "translate-x-5" : "translate-x-0"
                      }
            pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                    />
                  </Switch>
                </div>
              </div>
              <FieldContainer>
                <div className="flex flex-col items-start border-1 border-gray-300 m-4 p-4 rounded-lg bg-gray-50 text-sm ">
                  <div className="flex gap-2 items-center px-4">
                    <input type={"checkbox"} />
                    <span>Option 1</span>
                  </div>
                  <div className="flex gap-2 items-center px-4">
                    <input type={"checkbox"} />
                    <span>Option 2</span>
                  </div>
                  <div className="flex gap-2 items-center px-4">
                    <input type={"checkbox"} />
                    <span>Option 3</span>
                  </div>
                  <div className="flex gap-2 items-center px-4">
                    <input type={"checkbox"} />
                    <span>Option 4</span>
                  </div>
                  <div className="flex gap-2 items-center px-4">
                    <input type={"checkbox"} />
                    <span>Option 5</span>
                  </div>
                </div>
              </FieldContainer>
            </div>
          </FieldContainer>
        </div>
      </div>
    </NewLayout>
  );
}

export default AccessPage;
