import classnames from "classnames";
import { useState } from "react";
import InputMask from "react-input-mask";
import TextareaAutosize from "react-textarea-autosize";

const TextInput = ({
  value,
  onChange,
  mask,
  validation,
  invalidText,

  ...props
}) => {
  const [validInput, setValidInput] = useState(true);

  const inputClassNames = classnames(
    "bg-gradient-to-r from-gray-50 to-white text-xs text-gray-500  w-full h-10 border-gray-200 rounded-lg border-b-1  pl-6",
    { "border-red-400 border-b-2": !validInput },
    { "rounded-full": mask }
  );

  return (
    <div className="relative w-full">
      {mask ? (
        <InputMask
          className={inputClassNames}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onBlur={(e) => {
            if (validation) {
              setValidInput(validation(e.target.value));
            }
          }}
          mask={mask}
          {...props}
        ></InputMask>
      ) : (
        <TextareaAutosize
          className={inputClassNames}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onBlur={(e) => {
            if (validation) {
              const validationResult = validation(e.target.value);
              setValidInput(validationResult);
            }
          }}
          {...props}
        ></TextareaAutosize>
      )}
      {!validInput && invalidText && (
        <span className="flex w-full justify-center mb-2 text-red-500 text-xs italic text-center">
          {invalidText}
        </span>
      )}
    </div>
  );
};

export default TextInput;
