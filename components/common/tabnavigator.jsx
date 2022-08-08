import classNames from "classnames";
import React from "react";

function TabNavigator({ currentOptionIndex, onOptionSelected }) {
  return (
    <div className="flex justify-evenly w-full ">
      <span
        className={classNames("flex  h-10 cursor-pointer", {
          "font-bold border-b-2 border-purple-600 ": currentOptionIndex == 1,
        })}
        onClick={() => {
          onOptionSelected(1);
        }}
      >
        {" "}
        General
      </span>
      <span
        className={classNames("flex  h-10 cursor-pointer", {
          "font-bold border-b-2 border-purple-600 ": currentOptionIndex == 2,
        })}
        onClick={() => {
          onOptionSelected(2);
        }}
      >
        Suscripción
      </span>
      <span
        className={classNames("flex  h-10 cursor-pointer", {
          "font-bold border-b-2 border-purple-600 ": currentOptionIndex == 3,
        })}
        onClick={() => {
          onOptionSelected(3);
        }}
      >
        Equipo
      </span>
      <span
        className={classNames("flex  h-10 cursor-pointer", {
          "font-bold border-b-2 border-purple-600 ": currentOptionIndex == 4,
        })}
        onClick={() => {
          onOptionSelected(4);
        }}
      >
        Facturación
      </span>
    </div>
  );
}

export default TabNavigator;
