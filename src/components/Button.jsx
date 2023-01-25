import React from "react";
import { TailSpin } from "react-loader-spinner";

const Button = ({
  text,
  additionalClass,
  onClickHandler,
  accent,
  isActionLoading = false,
}) => {
  return isActionLoading ? (
    <div className={`px-16 py-2 rounded-full cursor-pointer bg-accent `}>
      <TailSpin width="30" height="30" color="white" />
    </div>
  ) : (
    <button
      className={`px-16 py-2 rounded-full cursor-pointer  ${additionalClass} ${
        accent ? "bg-accent text-white" : "text-accent bg-black"
      }`}
      onClick={onClickHandler}
    >
      {text}
    </button>
  );
};

export default Button;
