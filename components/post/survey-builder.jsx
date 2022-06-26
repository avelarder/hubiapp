import { CogIcon, MinusIcon, PlusIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { VALIDATIONS } from "../../utils/UI-Constants";

import { Switch } from "@headlessui/react";
import ContextualMenu from "../dashboard/contextualMenu";
import TextInput from "../common/textInput";
import RoundedInputText from "../common/roundedInputText";
import {
  StyledButton,
  StyledSecondaryButton,
} from "../admin/base-ui-components";

function SurveyOptionItem({ text, optionKey, onUpdateOption, onRemoveOption }) {
  const setOptionValue = (value, key) => {
    onUpdateOption(key, value);
  };

  return (
    <div className="flex flex-row" key={optionKey}>
      <div className="flex justify-start w-full items-center align-middle mt-1 ">
        <RoundedInputText
          validator={{
            validate: (content) => {
              return VALIDATIONS.NONE(content);
            },
            message: "Ingrese una opción válida",
          }}
          placeholder="Ingresa una opción"
          value={text}
          onChange={(e) => {
            setOptionValue(e.target.value, optionKey);
          }}
        ></RoundedInputText>
      </div>
      <div className="flex">
        {optionKey !== 0 && (
          <MinusIcon
            className="w-6 h-6 pl-2 text-purple-600 m-1 cursor-pointer self-center"
            onClick={onRemoveOption}
          ></MinusIcon>
        )}
      </div>
    </div>
  );
}

function SurveyBuilder({
  answerType,
  allowAddOption,
  expirationDate,
  options,
  onAnswerTypeChanged,
  onAddOptionChanged,
  onExpirationChanged,
  onOptionChanged,
}) {
  const [answerTypeEnabled, setAnswerTypeEnabled] = useState(
    answerType.id === "MULTIPLE"
  );
  const [addOptionEnabled, setAddOptionEnabled] = useState(allowAddOption);

  const addOption = (index) => {
    options.splice(index, 0, { key: index, text: "" });
    onOptionChanged(options);
  };
  const updateOption = (index, value) => {
    options[index].text = value;
    onOptionChanged(options);
  };
  const removeOption = (index) => {
    options.splice(index, 1);
    onOptionChanged(options);
  };

  const handleAnswerTypeChanged = (status) => {
    setAnswerTypeEnabled(status);
    onAnswerTypeChanged({
      id: status ? "MULTIPLE" : "SINGLE",
      text: status ? "Opción múltiple" : "Opción simple",
    });
  };

  const handleAllowAddOptionChanged = (status) => {
    setAddOptionEnabled(status);
    onAddOptionChanged({
      id: status ? "ENABLED" : "DISABLED",
      text: status ? "Si" : "No",
    });
  };

  return (
    <div className="text-xs w-full m-2">
      <div className="flex flex-col">
        {options.length > 0 &&
          options.map((option, index) => (
            <SurveyOptionItem
              onUpdateOption={updateOption}
              onRemoveOption={() => removeOption(option.key)}
              text={option.text}
              optionKey={option.key}
              key={index}
            />
          ))}
        <div className="flex items-center">
          <StyledButton
            className="flex text-sm h-8 w-full text-white  mt-2 items-center justify-center"
            onClick={() => addOption(options.length)}
          >
            <span>Agregar opción</span>
          </StyledButton>
          <ContextualMenu
            className="relative inline-flex pl-2"
            icon={<CogIcon width={20} height={20}></CogIcon>}
          >
            <li>
              <div className="w-80 px-2">
                <span className="text-gray-900 text-sm">Tipo de Respuesta</span>
                <div className="flex text-center pt-2 justify-evenly">
                  <span className="text-gray-500 text-xs px-2">Simple</span>
                  <Switch
                    checked={answerTypeEnabled}
                    onChange={handleAnswerTypeChanged}
                    className={`${
                      answerTypeEnabled ? "bg-purple-900" : "bg-purple-200"
                    }
          relative inline-flex flex-shrink-0 h-5 w-10 border-1 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        answerTypeEnabled ? "translate-x-5" : "translate-x-0"
                      }
            pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                    />
                  </Switch>
                  <span className="text-gray-500 text-xs px-2">Múltiple</span>
                </div>
              </div>
            </li>
            <li>
              <div className="w-80 px-2 pt-4 pb-2">
                <span className="text-gray-900 text-sm">
                  Permitir agregar opciones?
                </span>
                <div className="flex text-center pt-2 justify-evenly">
                  <span className="text-gray-500 text-xs px-2">No</span>
                  <Switch
                    checked={addOptionEnabled}
                    onChange={handleAllowAddOptionChanged}
                    className={`${
                      addOptionEnabled ? "bg-purple-900" : "bg-purple-200"
                    }
          relative inline-flex flex-shrink-0 h-5 w-10 border-1 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        addOptionEnabled ? "translate-x-5" : "translate-x-0"
                      }
            pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                    />
                  </Switch>
                  <span className="text-gray-500 text-xs px-2">Si</span>
                </div>
              </div>
            </li>
          </ContextualMenu>
        </div>
      </div>
      <div className="divide-red-50 mb-4"></div>

      <div className="divide-red-50 mb-4"></div>
      <div className="flex items-center justify-between">
        <span className="flex w-full font-medium text-gray-700">
          Díganos, cuándo caduca esta encuesta?
        </span>
        <TextInput
          placeholder="DD/MM/AAAA"
          value={expirationDate}
          mask={"99/99/9999"}
          invalidText={"La fecha ingresada no es correcta."}
          validation={VALIDATIONS.DATE_AFTER}
          onChange={onExpirationChanged}
        ></TextInput>
      </div>
    </div>
  );
}

export default SurveyBuilder;
