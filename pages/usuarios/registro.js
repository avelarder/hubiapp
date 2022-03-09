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
import classNames from "classnames";
import { CheckIcon, XIcon } from "@heroicons/react/solid";

function RoundedInputText({ value, onChange, placeholder, type, validator, props }) {

    const [hasError, setHasError] = useState(null);

    return (
        <div className="flex">
            <div className="relative items-center w-full">
                <input
                    className={classNames("  text-xs text-gray-500 font-semibold  w-full h-9 border-purple-300 rounded-full pr-10 pl-4 border-1 ", { "text-black border-red-600 bg-red-200": hasError })}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    type={type}
                    onBlur={(e) => {
                        validator && setHasError(!validator.validate(e.currentTarget.value))
                    }}
                    {...props}
                ></input>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                    {hasError ? <XIcon className="text-red-500" width={20} height={20} /> : <CheckIcon className="text-purple-500" width={20} height={20}></CheckIcon>}

                </span>
            </div>
        </div >
    );
}

function RegistroPage() {
    const validatorConfig = {
        firstName: {
            validate: (content) => {
                return VALIDATIONS.REQUIRED_FREE_TEXT(content)
            },
            message: "Nombre es requerido."
        },
        lastName: {
            validate: (content) => {
                return VALIDATIONS.REQUIRED_FREE_TEXT(content)
            },
            message: "Apellidos son requeridos."
        },
        phone: {
            validate: (content) => {
                return VALIDATIONS.ONLY_NUMBERS(content)
            },
            message: "El número de celular es requerido."
        },
        email: {
            validate: (content) => {
                return VALIDATIONS.EMAIL(content)
            },
            message: "Nombre es requerido."
        },
        password: {
            validate: (content) => {
                return VALIDATIONS.REQUIRED_FREE_TEXT(content)
            },
            message: "Ingrese su contraseña."
        },
        confirmPassword: {
            validate: (content) => {
                return VALIDATIONS.REQUIRED_FREE_TEXT(content) && password === confirmPassword
            },
            message: "Reingrese su contraseña."
        }
    }


    const handleContinueClicked = () => {
        if (!validatorConfig.firstName.validate(firstName) ||
            !validatorConfig.lastName.validate(lastName) ||
            !validatorConfig.phone.validate(phone) ||
            !validatorConfig.email.validate(email) ||
            !validatorConfig.password.validate(password) ||
            !validatorConfig.confirmPassword.validate(confirmPassword)) {
            toast.warning("Por favor complete el formulario.");
        }
    };

    const days = getScheduleDays();
    const months = getScheduleMonths();
    const years = getScheduleYears(1900, new Date().getFullYear() - 18);


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
            <div className="flex w-2/6"></div>
            <div className="flex flex-col w-2/6 items-left  align-middle mt-10">
                <section className="">
                    <h1 className="text-gray-900 text-3xl font-bold">
                        Hola, un gusto verte
                    </h1>
                    <h3>Ingresa tus datos, es rápido y fácil.</h3>
                </section>
                <section className="">
                    <FieldContainer>
                        <RoundedInputText
                            validator={validatorConfig.firstName}
                            value={firstName}
                            onChange={(e) => setFirstName(e.currentTarget.value)}
                            placeholder="Nombres"
                        ></RoundedInputText>
                    </FieldContainer>
                    <FieldContainer>
                        <RoundedInputText
                            validator={validatorConfig.lastName}
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
                                    validator={validatorConfig.phone}
                                    value={phone}
                                    onChange={(e) => setPhone(e.currentTarget.value)}
                                    placeholder="Teléfono Móvil"
                                ></RoundedInputText>
                            </div>
                        </div>
                    </FieldContainer>
                    <FieldContainer>
                        <RoundedInputText
                            validator={validatorConfig.email}
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                            placeholder="Ingresa tu correo electónico"
                        ></RoundedInputText>
                    </FieldContainer>
                    <FieldContainer>
                        <RoundedInputText
                            validator={validatorConfig.password}
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                            placeholder="Ingresa nueva contraseña"
                            type="password"
                        ></RoundedInputText>
                    </FieldContainer>
                    <FieldContainer>
                        <RoundedInputText
                            validator={validatorConfig.confirmPassword}
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
                        <button className="w-64 bg-purple-600 h-10 shadow-md rounded-full" onClick={handleContinueClicked}>
                            Continuar
                        </button>
                    </div>

                </section>

            </div>
            <div className="flex w-2/6"></div>
            <ToastContainer />
        </div >
    );
}
export default RegistroPage;
