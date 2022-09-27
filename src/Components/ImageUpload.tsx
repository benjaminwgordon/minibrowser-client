import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useState } from "react";

interface IImageUploadProps {
  image: any;
  setImage: Dispatch<SetStateAction<any>>;
}

const ImageUpload = (props: IImageUploadProps) => {
  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files[0]) {
      props.setImage(event.target.files[0]);
    }
  };

  const handleDeleteUploadedImage = () => {
    props.setImage(undefined);
  };

  return props.image ? (
    <div className="flex items-center justify-center">
      <img src={URL.createObjectURL(props.image)} alt="user uploaded image" />
      <input
        type="button"
        value="Change Image"
        onClick={() => handleDeleteUploadedImage()}
      />
    </div>
  ) : (
    <input
      type="file"
      name="imageUpload"
      id="imageUpload"
      onChange={(e) => handleUploadImage(e)}
    />
  );
};

export default ImageUpload;
