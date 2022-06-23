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

  //  className={classNames(
  //     "bg-gradient-to-r from-gray-50 to-white text-xs text-gray-500  w-full h-10 border-grayt-200 rounded-full border-b-1 focus:border-purple-900 pl-6",
  //     { "text-black bg-red-200": hasError }
  //   )}
  const inputClassNames = classnames(
    "bg-gradient-to-r from-gray-50 to-white text-xs text-gray-500  w-full h-10 border-grayt-200 rounded-full border-b-1 focus:border-purple-900 pl-6",
    { "border-red-500": !validInput }
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
        <p className="text-red-500 text-xs italic">{invalidText}</p>
      )}
    </div>
  );
};

export default TextInput;
