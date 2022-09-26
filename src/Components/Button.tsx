import React from "react";

interface IButtonProps {
  onClick: () => void;
  additionalStyles?: string;
  value: string | JSX.Element;
}

const Button = (props: IButtonProps) => {
  return (
    <button
      className={
        "text-white bg-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium " +
        props.additionalStyles
      }
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
};

export default Button;
