import { CogIcon, MinusIcon, PlusIcon } from '@heroicons/react/outline';
import React, { useState } from 'react'
import { VALIDATIONS } from "../../utils/UI-Constants";

import { Switch } from '@headlessui/react'
import ContextualMenu from '../dashboard/contextualMenu';
import TextInput from '../common/textInput';

function SurveyOptionItem({ text, optionKey, onUpdateOption, onRemoveOption }) {

    const setOptionValue = (value, key) => {

        onUpdateOption(key, value);
    };

    return (
        <div className="flex flex-row" key={optionKey}>
            <div className='flex justify-start w-full items-center align-middle '>
                <TextInput
                    validation={VALIDATIONS.REQUIRED_FREE_TEXT}
                    invalidText={'Este campo es obligatorio.'}
                    className="text-sm text-gray-500 w-full h-10 border-gray-200 rounded-lg p-2  border-1"
                    aria-multiline={true}
                    multiple={true}
                    placeholder="Ingresa una opción"
                    value={text}
                    onChange={(value) => setOptionValue(value, optionKey)}
                ></TextInput>
            </div>
            <div className='flex'>
                {optionKey !== 0 && <MinusIcon className='w-7 h-7 pl-2 text-purple-600 m-1 cursor-pointer self-center' onClick={onRemoveOption} ></MinusIcon>}

            </div>
        </div >
    )
}

function SurveyBuilder({ answerType, allowAddOption, expirationDate, options, onAnswerTypeChanged, onAddOptionChanged, onExpirationChanged, onOptionChanged }) {


    const [localOptions, setLocalOptions] = useState(options);
    const [answerTypeEnabled, setAnswerTypeEnabled] = useState(answerType.id === 'MULTIPLE');
    const [addOptionEnabled, setAddOptionEnabled] = useState(allowAddOption);

    const addOption = (index) => {
        localOptions.splice(index, 0, { key: index, text: '' });
        onOptionChanged(localOptions);
    }
    const updateOption = (index, value) => {
        localOptions[index].text = value;
        onOptionChanged(localOptions);
    }
    const removeOption = (index) => {

        localOptions.splice(index, 1);
        onOptionChanged(localOptions);
    }

    const handleAnswerTypeChanged = (status) => {
        setAnswerTypeEnabled(status);
        onAnswerTypeChanged({ id: status ? 'MULTIPLE' : 'SINGLE', text: status ? 'Opción múltiple' : 'Opción simple' });
    }


    const handleAllowAddOptionChanged = (status) => {
        setAddOptionEnabled(status);
        onAddOptionChanged({ id: status ? 'ENABLED' : 'DISABLED', text: status ? 'Si' : 'No' });
    }

    return (
        <div>
            <div className="flex flex-col">
                {localOptions.length > 0 && localOptions.map((option, index) => <SurveyOptionItem onUpdateOption={updateOption} onRemoveOption={() => removeOption(option.key)} text={option.text} optionKey={option.key} key={index} />)}
                <div className='flex items-center'>
                    <button className='flex text-sm text-gray-500 w-full h-10 border-gray-200 rounded-lg 2 border-1 items-center justify-center' onClick={() => addOption(localOptions.length)}><PlusIcon className='flex w-7 h-7 text-purple-600 text-center'></PlusIcon></button>
                    <ContextualMenu className="relative inline-flex pl-2" icon={<CogIcon width={20} height={20}></CogIcon>}>
                        <li>
                            <div className='w-80 px-2'><span className="text-gray-900 text-sm">Tipo de Respuesta</span>
                                <div className='flex text-center pt-2 justify-evenly'>
                                    <span className="text-gray-500 text-xs px-2">Simple</span>
                                    <Switch
                                        checked={answerTypeEnabled}
                                        onChange={handleAnswerTypeChanged}
                                        className={`${answerTypeEnabled ? 'bg-purple-900' : 'bg-purple-200'}
          relative inline-flex flex-shrink-0 h-5 w-10 border-1 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                    >

                                        <span
                                            aria-hidden="true"
                                            className={`${answerTypeEnabled ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                                        />
                                    </Switch>
                                    <span className="text-gray-500 text-xs px-2">Múltiple</span>
                                </div>
                            </div>
                        </li>
                        <li><div className='w-80 px-2 pt-4 pb-2'><span className="text-gray-900 text-sm">Permitir agregar opciones?</span>
                            <div className='flex text-center pt-2 justify-evenly'>
                                <span className="text-gray-500 text-xs px-2">No</span>
                                <Switch
                                    checked={addOptionEnabled}
                                    onChange={handleAllowAddOptionChanged}
                                    className={`${addOptionEnabled ? 'bg-purple-900' : 'bg-purple-200'}
          relative inline-flex flex-shrink-0 h-5 w-10 border-1 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                >

                                    <span
                                        aria-hidden="true"
                                        className={`${addOptionEnabled ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                                    />
                                </Switch>
                                <span className="text-gray-500 text-xs px-2">Si</span>
                            </div>
                        </div>
                        </li>
                    </ContextualMenu></div>
            </div>
            <div className="divide-red-50 mb-4"></div>

            <div className="divide-red-50 mb-4"></div>
            <div className="flex flex-col">
                <span className='w-full block text-sm font-medium text-gray-700'>Díganos, cuándo caduca esta encuesta? </span>
                <TextInput
                    placeholder="DD/MM/AAAA"
                    value={expirationDate}
                    mask={"99/99/9999"}
                    invalidText={"La fecha ingresada no es correcta."}
                    validation={VALIDATIONS.DATE_AFTER}
                    onChange={onExpirationChanged}

                ></TextInput>
            </div>
        </div >
    )
}

export default SurveyBuilder
