import React from 'react'
import TextInput from '../../components/common/textInput'
import { UserAddIcon } from "@heroicons/react/solid"
import FieldContainer from "../../components/common/field-container"

function RegisterPage() {

    const [name, setName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [dobDay, setDobDay] = React.useState('')
    const [dobMonth, setDobMonth] = React.useState('')
    const [dobYear, setDobYear] = React.useState('')
    const [gender, setGender] = React.useState('')
    const [status, setStatus] = React.useState('')
    const [accessType, setAccessType] = React.useState('')

    return (
        <div className='flex flex-col justify-center items-center w-full'>
            <section className='flex flex-col items-center' >
                <h1>Bienvenido!</h1>
                <h3>Ingresa tus datos, es rápido y fácil.</h3>
            </section>
            <section className='flex flex-wrap w-3/6 items-center'>
                <div className='flex'>
                    <FieldContainer title={"Nombres"}>
                        <TextInput className="text-sm text-gray-500 w-64 h-10 border-gray-200 rounded-lg border-1" value={name} onChange={setName}></TextInput>
                    </FieldContainer>
                    <FieldContainer title={"Apellidos"}>
                        <TextInput value={lastName} onChange={setLastName} className="text-sm text-gray-500 w-64 h-10 border-gray-200 rounded-lg border-1"></TextInput>
                    </FieldContainer>
                </div>
                <div className='flex w-full'>
                    <FieldContainer title={"Email"}>
                        <TextInput value={email} onChange={setEmail} className="text-sm text-gray-500 w-96 h-10 border-gray-200 rounded-lg border-1"></TextInput>
                    </FieldContainer>
                    <br></br>
                    <FieldContainer title={"Contraseña"}><TextInput value={password} onChange={setPassword} className="text-sm text-gray-500 w-full h-10 border-gray-200 rounded-lg border-1"></TextInput></FieldContainer >
                    <FieldContainer title={"Confirmar Contraseña"}><TextInput value={confirmPassword} onChange={setConfirmPassword} className="text-sm text-gray-500 w-full h-10 border-gray-200 rounded-lg border-1"></TextInput></FieldContainer >
                </div>
                <div className='flex w-full'>
                    <FieldContainer title={"Número de Celular"}><TextInput value={phoneNumber} onChange={setPhoneNumber} className="text-sm text-gray-500 w-full h-10 border-gray-200 rounded-lg border-1"></TextInput></FieldContainer >
                </div>
                <div className='flex w-full'>
                    <FieldContainer title={"Fecha de Nacimiento"}>
                        <FieldContainer title={"Día"}><TextInput value={dobDay} onChange={setDobDay} className="text-sm text-gray-500 w-full h-10 border-gray-200 rounded-lg border-1"></TextInput></FieldContainer >
                        <FieldContainer title={"Mes"}><TextInput value={dobMonth} onChange={setDobMonth} className="text-sm text-gray-500 w-full h-10 border-gray-200 rounded-lg border-1"></TextInput></FieldContainer >
                        <FieldContainer title={"Año"}><TextInput value={dobYear} onChange={setDobYear} className="text-sm text-gray-500 w-full h-10 border-gray-200 rounded-lg border-1"></TextInput></FieldContainer>
                    </FieldContainer>
                </div>
                <div className='flex'>
                    <FieldContainer title={"Género"}><TextInput value={gender} onChange={setGender} className="text-sm text-gray-500 w-full h-10 border-gray-200 rounded-lg border-1"></TextInput></FieldContainer>
                    <FieldContainer title={"Estado Civil"}><TextInput value={status} onChange={setStatus} className="text-sm text-gray-500 w-full h-10 border-gray-200 rounded-lg border-1"></TextInput></FieldContainer>
                    <FieldContainer title={"Tipo de Acceso"}><TextInput value={accessType} onChange={setAccessType} className="text-sm text-gray-500 w-full h-10 border-gray-200 rounded-lg border-1"></TextInput></FieldContainer>
                </div>
            </section>
            <section>
                <button
                    className="w-full inline-flex justify-center items-center rounded-xl border px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700 sm:text-sm sm:mb-3 md:mx-1 sm:w-40 shadow-sm"
                    onClick={() => {
                        console.log("Registrar");
                    }}
                >
                    <UserAddIcon className="w-5 h-5 mr-2 font-monse"></UserAddIcon>Registrar
                </button>

            </section>
        </div >
    )
}

export default RegisterPage