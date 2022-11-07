import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import FieldContainer from "../common/field-container";
import Select from "../common/select";
import { VALIDATIONS } from "../../utils/UI-Constants";
import RoundedInputText from "../common/roundedInputText";
import { XIcon } from "@heroicons/react/solid";
import {
  StyledButton,
  StyledSecondaryButton,
} from "../admin/base-ui-components";
import FileUpload from "../common/file-upload";
import TextInput from "../common/textInput";

function IncidentEdit({
  title,
  description,
  incidentType,
  onContinueClicked,
  formValidatorConfig,
  incidentOptions,
}) {
  const [titleState, setTitleState] = useState(title);
  const [descriptionState, setDescriptionState] = useState(description);
  const [images, setImages] = useState([]);
  const [incidentTypeState, setIncidentTypeState] = useState(incidentType);

  const defaultButton = useRef(null);
  const router = useRouter();

  return (
    <div className="flex flex-col w-full">
      <section className="">
        <h1 className="text-gray-900 text-3xl font-bold text-center">
          Editar Incidencia
        </h1>
      </section>
      <section className="mt-10">
        <h3 className="font-bold">Tipo de Incidencia</h3>
      </section>
      <section>
        <div className="flex flex-col items-center ">
          <FieldContainer>
            <Select
              options={incidentOptions}
              selectedOption={incidentTypeState}
              onOptionChanged={setIncidentTypeState}
            ></Select>
          </FieldContainer>

          <FieldContainer>
            <RoundedInputText
              validator={formValidatorConfig.title}
              value={titleState}
              onChange={(e) => setTitleState(e.currentTarget.value)}
              placeholder="Título"
            ></RoundedInputText>
          </FieldContainer>
          <FieldContainer>
            <TextInput
              rows={5}
              minRows={3}
              maxRows={10}
              placeholder="Detalle del Incidente"
              value={descriptionState}
              invalidText="Ingresa una descripción"
              onChange={setDescriptionState}
              validation={VALIDATIONS.NONE}
            ></TextInput>
          </FieldContainer>
        </div>

        <FieldContainer>
          <div className="flex justify-start text-white text-md font-bold mt-2 w-full ">
            <div className="flex flex-col mt-4 w-full">
              <FileUpload
                onFileSelected={(file) => {
                  const newImageList = [...images, file];
                  setImages(newImageList);
                }}
              ></FileUpload>

              {images.length === 0 ? (
                <span className="text-black">0 archivos.</span>
              ) : (
                <ul className="flex flex-col mt-4 list-disc w-full">
                  {images.map((image, index) => (
                    <li
                      className="flex  text-black text-sm justify-between"
                      key={index}
                    >
                      <span className="w-ful uppercase">{image.name}</span>
                      <XIcon className="flex w-5 h-5 cursor-pointer hover:text-red-500"></XIcon>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </FieldContainer>
        <div className="flex justify-end text-white text-md font-bold  mt-8 ">
          <StyledSecondaryButton
            ref={defaultButton}
            className="w-32 bg-gray-400  h-300 shadow-md rounded-md mr-5"
            onClick={() => router.back()}
          >
            Regresar
          </StyledSecondaryButton>
          <StyledButton
            className="w-64 bg-purple-600 h-10 shadow-md rounded-md"
            onClick={(e) =>
              onContinueClicked(e, {
                title: titleState,
                description: descriptionState,
                incidentType: incidentTypeState,
                images,
              })
            }
          >
            Actualizar
          </StyledButton>
        </div>
      </section>
    </div>
  );
}

export default IncidentEdit;
