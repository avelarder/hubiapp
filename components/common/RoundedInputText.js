import React, { useState } from "react";
import classNames from "classnames";

function RoundedInputText({ value, onChange, placeholder, type, validator, props }) {

    const [hasError, setHasError] = useState(null);

    return (
        <div>
            <input
                className={classNames("text-xs text-gray-500 font-semibold  w-full h-9 border-purple-300 rounded-full pr-10 pl-4 border-1 focus:border-purple-900", { "text-black bg-red-200": hasError })}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                onBlur={(e) => {
                    validator && setHasError(!validator.validate(e.currentTarget.value))
                }}
                {...props}
            ></input>
        </div >
    );
}


export default RoundedInputText