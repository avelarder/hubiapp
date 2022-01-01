import { DocumentAddIcon, DocumentRemoveIcon } from '@heroicons/react/solid';
import React, { useState } from 'react'
import moment from 'moment';
import TextareaAutosize from 'react-textarea-autosize';

function SurveyOptionItem({ text, optionKey, onAddOption, onRemoveOption }) {

    const [optionText, setOptionText] = useState(text);

    const setOptionValue = (value) => {
        setOptionText(value);
    };

    return (
        <div className="flex flex-row" key={optionKey}>
            <div className='flex justify-start w-full items-center align-middle '> <TextareaAutosize
                className="text-sm text-gray-500 w-full h-10 border-gray-200 rounded-lg p-2 border-2"
                aria-multiline={true}
                multiple={true}
                placeholder="Escribe una opción"
                value={
                    optionText
                }
                onChange={(e) =>
                    setOptionValue(e.currentTarget.value)
                }
            ></TextareaAutosize>
            </div>
            <div className='flex'>
                <DocumentRemoveIcon className='w-7 h-7 text-purple-600  border-2 border-purple-50 m-1 rounded-sm cursor-pointer' onClick={onRemoveOption} ></DocumentRemoveIcon>
                <DocumentAddIcon className='w-7 h-7 text-purple-600 border-2 border-purple-50 m-1 rounded-sm cursor-pointer' onClick={onAddOption}></DocumentAddIcon>
            </div>
        </div>
    )
}

function SurveyBuilder() {
    const [selectedDate, handleDateChange] = useState(moment(new Date()).format('DD-MM-YYYY'));
    const [surveyOptions, setSurveyOptions] = useState([{ key: 0, text: 'Escribe una opción' }]);

    const addOption = (index) => {
        const options = [...surveyOptions];
        options.splice(index, 0, { key: index, text: 'Escribe una opción' });
        setSurveyOptions(options);
    }

    const removeOption = (index) => {
        const options = [...surveyOptions];
        options.splice(index, 1);
        setSurveyOptions(options);
    }

    return (
        <div>
            <div className="flex flex-col">
                {surveyOptions.map((option, index) => <SurveyOptionItem onAddOption={addOption} onRemoveOption={removeOption} text={option.text} optionKey={index} key={index} />)}
            </div>
            <div className="divide-red-50 mb-4"></div>
            <div className="flex flex-col">
                <span>Díganos cuándo caduca esta encuesta? </span>

                <TextareaAutosize
                    className="text-sm text-gray-500 w-28 h-10 border-gray-200 rounded-lg p-2 border-2"
                    aria-multiline={true}
                    multiple={true}
                    placeholder="DD-MM-YYYY"
                    value={
                        selectedDate
                    }
                    onChange={
                        handleDateChange
                    }
                ></TextareaAutosize>
            </div>
        </div>
    )
}

export default SurveyBuilder
