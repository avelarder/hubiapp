import { MinusIcon, PlusIcon } from '@heroicons/react/outline';
import React, { useState } from 'react'
import moment from 'moment';
import TextareaAutosize from 'react-textarea-autosize';
import Dropdown from '../common/dropdown';

function SurveyOptionItem({ text, optionKey, onAddOption, onUpdateOption, onRemoveOption }) {

    // const [optionText, setOptionText] = useState(text);

    const setOptionValue = (value) => {
        // setOptionText(value);
        onUpdateOption(optionKey, value);
    };

    return (
        <div className="flex flex-row" key={optionKey}>
            <div className='flex justify-start w-full items-center align-middle '> <TextareaAutosize
                className="text-sm text-gray-500 w-full h-10 border-gray-200 rounded-lg p-2 border-2"
                aria-multiline={true}
                multiple={true}
                placeholder="Escribe una opción"
                value={
                    text
                }
                onChange={(e) =>
                    setOptionValue(e.currentTarget.value)
                }
            ></TextareaAutosize>
            </div>
            <div className='flex'>
                {optionKey !== 0 && <MinusIcon className='w-7 h-7 text-purple-600  border-2 border-purple-50 m-1 rounded-sm cursor-pointer' onClick={onRemoveOption} ></MinusIcon>}
                <PlusIcon className='w-7 h-7 text-purple-600 border-2 border-purple-50 m-1 rounded-sm cursor-pointer' onClick={onAddOption}></PlusIcon>
            </div>
        </div>
    )
}

function SurveyBuilder({ answerType, expirationDate, options, onAnswerTypeChanged, onExpirationChanged, onOptionChanged }) {

    const [localOptions, setLocalOptions] = useState(options);

    const surveyOptions = [{ key: "SINGLE", name: "Opción simple" }, { key: "MULTIPLE", name: "Opción múltiple" }];

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

    return (
        <div>
            <div className="flex flex-col">
                {localOptions.length > 0 && localOptions.map((option) => <SurveyOptionItem onAddOption={() => addOption(option.key + 1)} onUpdateOption={updateOption} onRemoveOption={() => removeOption(option.key)} text={option.text} optionKey={option.key} key={option.key} />)}
                {localOptions.length === 0 && <button className='flex text-sm text-gray-500 w-full h-10 border-gray-200 rounded-lg 2 border-2 items-center justify-center' onClick={() => addOption(0)}><PlusIcon className='flex w-7 h-7 text-purple-600 text-center'></PlusIcon></button>}
            </div>
            <div className="divide-red-50 mb-4"></div>
            <div className="flex flex-col">
                <span className='w-full block text-sm font-medium text-gray-700'>Seleccione el tipo de encuesta </span>

                <Dropdown keyValueOptions={surveyOptions} selected={answerType ?? surveyOptions[0]} onOptionChanged={onAnswerTypeChanged}></Dropdown>
            </div>
            <div className="divide-red-50 mb-4"></div>
            <div className="flex flex-col">
                <span className='w-full block text-sm font-medium text-gray-700'>Díganos, cuándo caduca esta encuesta? </span>

                <TextareaAutosize
                    className="text-sm text-gray-500 w-40 h-10 border-gray-200 rounded-lg p-2 border-2"
                    aria-multiline={true}
                    multiple={true}
                    placeholder="DD/MM/YYYY"
                    value={
                        expirationDate
                    }
                    onChange={(e) =>
                        onExpirationChanged(e.currentTarget.value)}
                ></TextareaAutosize>
            </div>
        </div >
    )
}

export default SurveyBuilder
