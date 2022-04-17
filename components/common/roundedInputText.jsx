import React, { useState } from "react";
import classNames from "classnames";

function RoundedInputText({
  value,
  onChange,
  placeholder,
  type,
  validator,
  props,
}) {
  const [hasError, setHasError] = useState(null);

  return (
    <input
      className={classNames(
        "text-xs text-gray-500 font-semibold w-full h-10 border-purple-300 rounded-full border-1 focus:border-purple-900 pl-6",
        { "text-black bg-red-200": hasError }
      )}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      onBlur={(e) => {
        validator && setHasError(!validator.validate(e.currentTarget.value));
      }}
      {...props}
    ></input>
  );
}

export default RoundedInputText;
