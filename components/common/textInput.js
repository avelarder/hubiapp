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

        "text-sm text-gray-500 w-40 h-10 border-gray-200 rounded-lg p-2 border-2",
        { "border-red-500": !validInput, }
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
                ></InputMask>
            ) : (
                <TextareaAutosize
                    // className="text-sm text-gray-500 w-full h-full border-gray-200 rounded-lg p-2 border-2"
                    value={
                        value
                    }
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

            )
            }
            {
                !validInput && invalidText && (
                    <p className="text-red-500 text-xs italic">{invalidText}</p>
                )
            }
        </div >
    );
};

export default TextInput;
