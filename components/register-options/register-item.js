import React from "react";
import { useRouter } from "next/router";

function RegisterItem({ title, desc, action, to, options }) {
  const router = useRouter();

  const handleClick = (e, target) => {
    e.preventDefault();
    router.push(target);
  };

  return (
    <div className="box-content h-full w-80 p-4 border-4 rounded-md bg-gray-30">
      <div className="box-content text-center font-sans text-4xl font-bold ">
        <h1>{title}</h1>
      </div>
      <div className="box-content text-center font-sans pt-5 pb-5 h-20">
        <span>{desc}</span>
      </div>
      <div className="box-content text-center font-sans pt-5 pb-5">
        <button
          onClick={(e) => handleClick(e, to)}
          className="h-10 w-max rounded-full px-20 bg-purple-600 bg-opacity-100 text-white hover:bg-purple-700"
        >
          {action}
        </button>
      </div>
      <div className="box-content font-sans pt-5 pb-5 ml-5">
        <ul className="list-disc">
          {options.map((x, index) => {
            return <li key={index}>{x}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default RegisterItem;
