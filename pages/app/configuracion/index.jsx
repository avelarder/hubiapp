import { Switch } from "@headlessui/react";
import { useRouter } from "next/router";
import React from "react";
import {
  StyledButton,
  StyledSecondaryButton,
} from "../../../components/admin/base-ui-components";
import FieldContainer from "../../../components/common/field-container";
import FileUpload from "../../../components/common/file-upload";
import RoundedInputText from "../../../components/common/roundedInputText";
import Select from "../../../components/common/select";
import TabNavigator from "../../../components/common/tabnavigator";
import Thumbnail from "../../../components/common/thumbnail";
import Footer from "../../../components/dashboard/footer";
import MainSection from "../../../components/dashboard/mainSection";
import NewLayout from "../../../components/newLayout";
import {
  documentTypeOptions,
  handleOptionSelected,
  phoneAreaOptions,
  VALIDATIONS,
} from "../../../utils/UI-Constants";

function GeneralPage() {
  const router = useRouter();

  const validatorConfig = {
    firstName: {
      validate: (content) => {
        return VALIDATIONS.REQUIRED_FREE_TEXT(content);
      },
      message: "Nombre es requerido.",
    },
    lastName: {
      validate: (content) => {
        return VALIDATIONS.REQUIRED_FREE_TEXT(content);
      },
      message: "Apellidos son requeridos.",
    },
    phone: {
      validate: (content) => {
        return VALIDATIONS.ONLY_NUMBERS(content);
      },
      message: "El número de celular es requerido.",
    },
    address: {
      validate: (content) => {
        return VALIDATIONS.REQUIRED_FREE_TEXT(content);
      },
      message: "Ingrese dirección.",
    },

    email: {
      validate: (content) => {
        return VALIDATIONS.EMAIL(content);
      },
      message: "Ingrese su correo electrónico.",
    },

    documentId: {
      validate: (content) => {
        return VALIDATIONS.ONLY_NUMBERS(content);
      },
      message: "Reingrese su documento de identidad.",
    },
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
                  currentOptionIndex={1}
                ></TabNavigator>
              </div>
              <div className="flex flex-col mt-16 ">
                {/* Photo */}
                <div className="flex flex-col gap-8 w-full">
                  <span className="flex font-bold">Foto de Perfil</span>
                  <div className="flex flex-col items-center">
                    <Thumbnail imagePath={"images/user-36-07.jpg"}></Thumbnail>
                    <FileUpload></FileUpload>
                  </div>
                </div>
                {/* Personal information */}
                <div className="flex flex-col gap-8 w-full mt-8">
                  <span className="flex font-bold">Datos Personales</span>
                  <div className="flex flex-col w-full">
                    <div className="flex w-full gap-2 justify-evenly">
                      <RoundedInputText
                        validator={validatorConfig.firstName}
                        value={"demo"}
                        onChange={() => {}}
                      ></RoundedInputText>

                      <RoundedInputText
                        validator={validatorConfig.lastName}
                        value={"demo"}
                        onChange={() => {}}
                      ></RoundedInputText>
                    </div>
                    <div className="flex w-full gap-2 justify-evenly">
                      <div className="w-2/4">
                        <Select
                          options={documentTypeOptions}
                          selectedOption={documentTypeOptions[0]}
                          onOptionChanged={() => {}}
                        ></Select>
                      </div>
                      <div className="w-2/4">
                        <RoundedInputText
                          validator={validatorConfig.documentId}
                          value={"9999999"}
                          onChange={(e) => setDocumentId(e.currentTarget.value)}
                        ></RoundedInputText>
                      </div>
                    </div>
                    <div className="flex w-full gap-2 justify-evenly">
                      <div className="w-2/4">
                        <Select
                          options={phoneAreaOptions}
                          selectedOption={phoneAreaOptions.find(
                            (x) => x.id == "PE/PER"
                          )}
                          onOptionChanged={() => {}}
                        ></Select>
                      </div>
                      <div className="w-2/4">
                        <RoundedInputText
                          validator={validatorConfig.phone}
                          value={"9999999"}
                          onChange={(e) => setDocumentId(e.currentTarget.value)}
                        ></RoundedInputText>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Notifications */}
                <div className="flex flex-col gap-4 w-full mt-8">
                  <span className="flex font-bold">Notificaciones</span>
                  <div className="flex w-full text-sm">
                    <div className="w-2/4">Notificaciones por Aprobaciones</div>
                    <div className="w-2/4">
                      <Switch
                        checked={false}
                        onChange={() => {}}
                        className={`${"bg-purple-900"}
          relative inline-flex flex-shrink-0 h-5 w-10 border-1 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                      >
                        <span
                          aria-hidden="true"
                          className={`${"translate-x-5"}
            pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                        />
                      </Switch>
                    </div>
                  </div>
                  <div className="flex w-full text-sm">
                    <div className="w-2/4">Notificaciones por Control Dual</div>
                    <div className="w-2/4">
                      <Switch
                        checked={false}
                        onChange={() => {}}
                        className={`${"bg-purple-900"}
          relative inline-flex flex-shrink-0 h-5 w-10 border-1 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                      >
                        <span
                          aria-hidden="true"
                          className={`${"translate-x-5"}
            pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                        />
                      </Switch>
                    </div>
                  </div>
                </div>

                {/* Automatic responses */}
                <div className="flex flex-col gap-4 w-full mt-8">
                  <span className="flex font-bold">Respuestas Automáticas</span>
                  <div className="flex w-full text-sm">
                    <div className="w-2/4">
                      Respuesta de Ingreso y Salida de Empleado
                    </div>
                    <div className="w-2/4">
                      <Switch
                        checked={false}
                        onChange={() => {}}
                        className={`${"bg-purple-900"}
          relative inline-flex flex-shrink-0 h-5 w-10 border-1 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                      >
                        <span
                          aria-hidden="true"
                          className={`${"translate-x-5"}
            pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                        />
                      </Switch>
                    </div>
                  </div>
                  <div className="flex w-full text-sm">
                    <div className="w-2/4">Respuesta por desconexión</div>
                    <div className="w-2/4">
                      <Switch
                        checked={false}
                        onChange={() => {}}
                        className={`${"bg-purple-900"}
          relative inline-flex flex-shrink-0 h-5 w-10 border-1 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                      >
                        <span
                          aria-hidden="true"
                          className={`${"translate-x-5"}
            pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                        />
                      </Switch>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end text-white text-md font-bold  mt-8 ">
              <StyledSecondaryButton
                className="w-32 bg-gray-400  h-300 shadow-md rounded-md mr-5"
                onClick={() => router.back()}
              >
                Regresar
              </StyledSecondaryButton>
              <StyledButton
                className="w-64 bg-purple-600 h-10 shadow-md rounded-md"
                onClick={() => {}}
              >
                Guardar cambios
              </StyledButton>
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

export default GeneralPage;
