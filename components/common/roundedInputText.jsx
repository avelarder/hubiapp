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
  const [hasError, setHasError] = useState(
    validator && !validator.validate(value)
  );

  return (
    <input
      className={classNames(
        "bg-gradient-to-r from-gray-50 to-white text-xs text-gray-500  w-full h-10 border-grayt-200 rounded-full border-b-1 focus:border-purple-900 pl-6",
        { " border-red-400 border-b-2": hasError }
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
