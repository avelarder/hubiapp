import Image from "next/image";
import { useState } from "react";
import { phoneAreaOptions, VALIDATIONS } from "../../utils/UI-Constants";
import Chip from "../common/chip";
import FieldContainer from "../common/field-container";
import FileUpload from "../common/file-upload";
import RoundedInputText from "../common/roundedInputText";
import Select from "../common/select";
import TextInput from "../common/textInput";

export default function EventScreen({ onCancel }) {
  const [images, setImages] = useState([]);
  const [phoneArea, setPhoneArea] = useState(
    phoneAreaOptions.find((x) => x.id === "PE/PER")
  );
  return (
    <div className="flex">
      <div className="flex flex-col w-1/2">
        {/* Photo and User */}
        <div className="flex items-center ">
          <Image
            className="w-6 h-6 rounded-full"
            src="/sample-profile.jpg"
            width="32"
            height="32"
            alt="User"
          />

          <span className="flex ml-4 text-sm">Oscar Velarde</span>
        </div>
        {/* Content */}
        <div className="flex flex-col mt-2 ">
          <FieldContainer title={"Evento"}>
            <RoundedInputText
              validator={{
                validate: (content) => {
                  return VALIDATIONS.NONE(content);
                },
                message: "Ingrese una opción válida",
              }}
              placeholder="Ingresa una opción"
              value={""}
              onChange={(e) => {}}
            ></RoundedInputText>
          </FieldContainer>
          <div className="flex w-full gap-2">
            <FieldContainer title={"Fecha Inicio"}>
              <RoundedInputText
                validator={{
                  validate: (content) => {
                    return VALIDATIONS.NONE(content);
                  },
                  message: "Ingrese una opción válida",
                }}
                placeholder="Ingresa una opción"
                value={""}
                onChange={(e) => {}}
              ></RoundedInputText>
            </FieldContainer>
            <FieldContainer title={"Hora"}>
              <RoundedInputText
                validator={{
                  validate: (content) => {
                    return VALIDATIONS.NONE(content);
                  },
                  message: "Ingrese una opción válida",
                }}
                placeholder="Ingresa una opción"
                value={""}
                onChange={(e) => {}}
              ></RoundedInputText>
            </FieldContainer>
          </div>
          <div className="flex w-full gap-2">
            <FieldContainer title={"Fecha de Fin"}>
              <RoundedInputText
                validator={{
                  validate: (content) => {
                    return VALIDATIONS.NONE(content);
                  },
                  message: "Ingrese una opción válida",
                }}
                placeholder="Ingresa una opción"
                value={""}
                onChange={(e) => {}}
              ></RoundedInputText>
            </FieldContainer>
            <FieldContainer title={"Hora"}>
              <RoundedInputText
                validator={{
                  validate: (content) => {
                    return VALIDATIONS.NONE(content);
                  },
                  message: "Ingrese una opción válida",
                }}
                placeholder="Ingresa una opción"
                value={""}
                onChange={(e) => {}}
              ></RoundedInputText>
            </FieldContainer>
          </div>
          <div className="flex w-full gap-2">
            <FieldContainer title={"Privacidad"}>
              <Select
                options={phoneAreaOptions}
                selectedOption={phoneArea}
                onOptionChanged={setPhoneArea}
              ></Select>
            </FieldContainer>
            <FieldContainer title={"Ubicación"}>
              <RoundedInputText
                validator={{
                  validate: (content) => {
                    return VALIDATIONS.NONE(content);
                  },
                  message: "Ingrese una opción válida",
                }}
                placeholder="Ingresa una opción"
                value={""}
                onChange={(e) => {}}
              ></RoundedInputText>
            </FieldContainer>
          </div>
          <FieldContainer title={"Descripción"}>
            <TextInput
              rows={5}
              minRows={3}
              maxRows={10}
              placeholder="Hola, ingresa el detalle de tu publicación aquí...."
              value={""}
              invalidText="Ingresa una descripción"
              onChange={() => {}}
              validation={VALIDATIONS.NONE}
            ></TextInput>
          </FieldContainer>
          <FieldContainer>
            <div className="flex w-full flex-col">
              <div className="flex items-center border-1 my-2  rounded-lg border-gray-300">
                <FileUpload
                  onFileSelected={(file) => {
                    const newImageList = [...images, file];
                    setImages(newImageList);
                  }}
                ></FileUpload>
              </div>
              <div>
                {images.length === 0 ? (
                  <span className="text-black">0 archivos.</span>
                ) : (
                  <div className="flex flex-wrap mt-4  w-full">
                    {images.map((image, index) => (
                      <Chip
                        key={index}
                        text={image.name}
                        index={index}
                        onRemoveChip={() => {}}
                      ></Chip>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </FieldContainer>
        </div>
      </div>
      <div className="flex flex-col w-1/2"></div>
    </div>
  );
}
