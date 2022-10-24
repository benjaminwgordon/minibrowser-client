import React from "react";

interface IModalProps {
  content: React.ReactNode;
  close: () => void;
}

const Modal = (props: IModalProps) => {
  return (
    <div
      className="fixed top-0 left-0 z-50 w-screen h-screen backdrop-blur-sm backdrop-brightness-50 flex items-center justify-center"
      onClick={() => props.close()}
    >
      <div
        className="flex flex-col justify-center items-center rounded-lg m-5"
        onClick={(e) => e.stopPropagation()}
      >
        {props.content}
      </div>
    </div>
  );
};

export default Modal;
