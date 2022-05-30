import React from "react";
import Image from "next/image";
import { StyledButton } from "../admin/base-ui-components";

function Card({ title, description, buttonLabel, onButtonClick, imageSrc }) {
  return (
    <div className="flex justify-center">
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <a onClick={onButtonClick}>
          <Image
            className="rounded-t-lg"
            src={imageSrc}
            alt=""
            width="100px"
            height="100px"
            layout="responsive"
          />
        </a>
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">{title}</h5>
          <p className="text-gray-700 text-base mb-4">{description}</p>
          <StyledButton onClick={onButtonClick}>{buttonLabel}</StyledButton>
        </div>
      </div>
    </div>
  );
}

export default Card;
