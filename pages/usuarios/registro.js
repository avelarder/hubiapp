import React, { useState } from "react";
import FieldContainer from "../../components/common/field-container";
import Select from "../../components/common/select";


import {
  getScheduleYears,
  getScheduleMonths,
  getScheduleDays,
  phoneAreaOptions,
  accessTypeOptions,
  statusOptions,
  genderOptions,
  VALIDATIONS
} from "../../utils/UI-Constants";
import { ToastContainer, toast } from 'react-toastify';
import RoundedInputText from "../../components/common/RoundedInputText";

function RegistroPage() {
  const handleContinueClicked = () => {
    if (!canContinue) {
      toast.warning("Por favor complete el formulario.");
    }

  };

  const days = getScheduleDays();
  const months = getScheduleMonths();
  const years = getScheduleYears(1900, new Date().getFullYear() - 18);
  const [canContinue, setCanContinue] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [phoneArea, setPhoneArea] = useState(
    phoneAreaOptions.find((x) => x.id === "PE/PER")
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState(genderOptions[0]);
  const [dobDay, setDobDay] = useState(days[0]);
  const [dobMonth, setDobMonth] = useState(months[0]);
  const [dobYear, setDobYear] = useState(years[years.length - 1]);
  const [status, setStatus] = useState(statusOptions[0]);
  const [accessType, setAccessType] = useState(accessTypeOptions[0]);


  return (
    <div className="flex items-center h-screen">
      <div className="flex lg:w-2/6 xs:w-1/6"></div>
      <div className="flex flex-col lg:w-2/6 xs:w-4/6 items-left  align-middle mt-10">
        <section className="">
          <h1 className="text-gray-900 text-3xl font-bold">
            Hola, un gusto verte
          </h1>
          <h3>Ingresa tus datos, es rápido y fácil.</h3>
        </section>
        <section className="">
          <FieldContainer>
            <RoundedInputText
              validator={{
                validate: (content) => {
                  return VALIDATIONS.REQUIRED_FREE_TEXT(content)
                },
                message: "Nombre es requerido."
              }}
              value={firstName}
              onChange={(e) => setFirstName(e.currentTarget.value)}
              placeholder="Nombres"
            ></RoundedInputText>
          </FieldContainer>
          <FieldContainer>
            <RoundedInputText
              validator={{
                validate: (content) => {
                  return VALIDATIONS.REQUIRED_FREE_TEXT(content)
                },
                message: "Apellidos son requeridos."
              }}
              value={lastName}
              onChange={(e) => setLastName(e.currentTarget.value)}
              placeholder="Apellidos"
            ></RoundedInputText>
          </FieldContainer>
          <FieldContainer>
            <div className="flex items-center ">
              <div className="w-2/4">
                <Select
                  options={phoneAreaOptions}
                  selectedOption={phoneArea}
                  onOptionChanged={setPhoneArea}
                ></Select>
              </div>
              <div className="w-2/4 ml-2">
                <RoundedInputText
                  validator={{
                    validate: (content) => {
                      return VALIDATIONS.ONLY_NUMBERS(content)
                    },
                    message: "El número de celular es requerido."
                  }}
                  value={phone}
                  onChange={(e) => setPhone(e.currentTarget.value)}
                  placeholder="Teléfono Móvil"
                ></RoundedInputText>
              </div>
            </div>
          </FieldContainer>
          <FieldContainer>
            <RoundedInputText
              validator={{
                validate: (content) => {
                  return VALIDATIONS.EMAIL(content)
                },
                message: "Correo Electrónico es requerido."
              }}
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder="Ingresa tu correo electónico"
            ></RoundedInputText>
          </FieldContainer>
          <FieldContainer>
            <RoundedInputText
              validator={{
                validate: (content) => {
                  return VALIDATIONS.REQUIRED_FREE_TEXT(content)
                },
                message: "Ingrese su contraseña."
              }}
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="Ingresa nueva contraseña"
              type="password"
            ></RoundedInputText>
          </FieldContainer>
          <FieldContainer>
            <RoundedInputText
              validator={{
                validate: (content) => {
                  return VALIDATIONS.REQUIRED_FREE_TEXT(content) && password === confirmPassword
                },
                message: "Reingrese su contraseña."
              }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              placeholder="Confirma nueva Contraseña"
              type="password"
            ></RoundedInputText>
          </FieldContainer>
          <FieldContainer title={"Fecha de Nacimiento"}>
            <div className="flex flex-wrap m-1">
              <div className="flex flex-col w-40 mr-2">
                <Select
                  options={months}
                  selectedOption={dobMonth}
                  onOptionChanged={setDobMonth}
                ></Select>
              </div>
              <div className="flex flex-col w-24 mr-2">
                <Select
                  options={days}
                  selectedOption={dobDay}
                  onOptionChanged={setDobDay}
                ></Select>
              </div>
              <div className="flex flex-col w-32">
                <Select
                  options={years}
                  selectedOption={dobYear}
                  onOptionChanged={setDobYear}
                ></Select>
              </div>
            </div>
          </FieldContainer>
          <FieldContainer title={""}>
            <div className="flex flex-wrap mx-1">
              <div className="flex flex-col w-40 mr-2">
                <Select
                  title={"Género"}
                  showTitle={true}
                  options={genderOptions}
                  selectedOption={gender}
                  onOptionChanged={setGender}
                ></Select>
              </div>
              <div className="flex flex-col w-40 mr-2">
                <Select
                  title={"Estado Civil"}
                  showTitle={true}
                  options={statusOptions}
                  selectedOption={status}
                  onOptionChanged={setStatus}
                ></Select>
              </div>
              <div className="flex flex-col w-40 ">
                <Select
                  title={"Acceso"}
                  showTitle={true}
                  options={accessTypeOptions}
                  selectedOption={accessType}
                  onOptionChanged={setAccessType}
                ></Select>
              </div>
            </div>
          </FieldContainer>
          <div className="flex justify-end text-white text-md font-bold  mt-8 ">
            <button className="w-64 bg-purple-600 h-10 shadow-md rounded-md" onClick={handleContinueClicked}>
              Continuar
            </button>
          </div>

        </section>

      </div>
      <div className="flex lg:w-2/6 xs:w-1/6"></div>
      <ToastContainer />
    </div >
  );
}
export default RegistroPage;
