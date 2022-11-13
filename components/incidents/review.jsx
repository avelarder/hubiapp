import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import FieldContainer from "../common/field-container";
import { VALIDATIONS } from "../../utils/UI-Constants";
import { XIcon } from "@heroicons/react/solid";
import {
  StateStyledButton,
  StyledButton,
  StyledSecondaryButton,
} from "../admin/base-ui-components";
import TextInput from "../common/textInput";
import classNames from "classnames";
import IncidentReturnedModal from "./incident-returned-modal";
import moment from "moment";
import Thumbnail from "../common/thumbnail";
import RoundedFieldValue from "../common/roundedFieldValue";

function IncidentReview({
  incident,
  documents,
  onReturnClicked,
  onContinueClicked,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actions, setActions] = useState("");
  const [images, setImages] = useState(documents);

  const defaultButton = useRef(null);
  const router = useRouter();

  return (
    <div className="flex flex-col w-full">
      <section className="">
        <h1 className="text-gray-900 text-3xl font-bold text-center">
          Supervisión de Incidencia
        </h1>
      </section>
      <section className="mt-10 mb-4 ">
        <h3 className="font-bold">Información del Reportante</h3>
      </section>
      <section>
        <div className="flex flex-col items-center gap-3 ">
          <FieldContainer title={"Nombre del Reportante"}>
            <RoundedFieldValue value={incident?.createdBy}></RoundedFieldValue>
          </FieldContainer>
          <FieldContainer title={"Ubicación"}>
            <RoundedFieldValue
              value={incident?.locationText}
            ></RoundedFieldValue>
          </FieldContainer>
          <FieldContainer title={"Tipo de Incidente"}>
            <RoundedFieldValue
              value={incident?.incidentType.text}
            ></RoundedFieldValue>
          </FieldContainer>
          <FieldContainer title={"Fecha de Registro"}>
            <RoundedFieldValue
              value={moment(incident?.createdOnUTC).format("YYYY-MM-DD HH:mm")}
            ></RoundedFieldValue>
          </FieldContainer>

          <FieldContainer title={"Detalle de Inicidencia"}>
            <RoundedFieldValue
              value={incident?.description}
              multilines={true}
            ></RoundedFieldValue>
          </FieldContainer>
        </div>

        {images && (
          <FieldContainer title={"Galería de Imágenes"}>
            <div className="grid grid-flow-col w-full h-48 px-2">
              {images.map((x, i) => (
                <Thumbnail key={i} imagePath={x.url}></Thumbnail>
              ))}
            </div>
          </FieldContainer>
        )}
        <section className="mt-10 mb-4 ">
          <h3 className="font-bold">Medidas Preventivas</h3>
        </section>
        <FieldContainer>
          <FieldContainer>
            <TextInput
              rows={5}
              minRows={3}
              maxRows={10}
              placeholder="Ingrese las acciones a tomar"
              value={actions}
              invalidText="Ingrese las acciones a tomar"
              onChange={setActions}
              validation={VALIDATIONS.NONE}
            ></TextInput>
          </FieldContainer>
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
            className="w-44 bg-purple-600 h-10 shadow-md rounded-md mr-5"
            onClick={(e) => setIsModalOpen(true)}
          >
            Devolver
          </StyledButton>
          <StateStyledButton
            disabled={actions.length === 0}
            onClick={(e) =>
              onContinueClicked(e, {
                actions,
              })
            }
          >
            Confirmar
          </StateStyledButton>
        </div>
      </section>
      {isModalOpen && (
        <IncidentReturnedModal
          onCancel={() => setIsModalOpen(false)}
          onConfirm={(comments) => onReturnClicked(comments)}
        ></IncidentReturnedModal>
      )}
    </div>
  );
}

export default IncidentReview;
