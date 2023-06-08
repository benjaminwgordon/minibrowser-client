import { PhotoIcon } from "@heroicons/react/24/outline";
import React, { Dispatch, SetStateAction } from "react";

interface IImageUploadProps {
  image: File | undefined;
  setImage: Dispatch<SetStateAction<File | undefined>>;
  nextStep: () => void;
  previousStep: () => void;
}

const ImageUpload = (props: IImageUploadProps) => {
  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files[0]) {
      props.setImage(event.target.files[0]);
      props.nextStep();
      FileList;
    }
  };

  const handleDeleteUploadedImage = () => {
    props.setImage(undefined);
  };

  return props.image ? (
    <div className="flex items-center justify-center">
      <img src={URL.createObjectURL(props.image)} alt="user upload" />
      <input
        type="button"
        value="Change Image"
        onClick={() => handleDeleteUploadedImage()}
      />
    </div>
  ) : (
    <div className="w-96 h-96 flex justify-center items-center bg-white rounded-lg">
      <label
        htmlFor="imageUpload"
        className="flex flex-col items-center justify-center"
      >
        <PhotoIcon className="h-24 w-24 text-gray-600 hover:text-gray-700 select-none" />
        <p className="text-lg">Drag an image to upload</p>
        <p className="mt-6 bg-blue-500 text-white rounded-md px-2 py-1 hover:bg-blue-600">
          Select from computer
        </p>
      </label>
      <input
        type="file"
        name="imageUpload"
        id="imageUpload"
        onChange={(e) => handleUploadImage(e)}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};

export default ImageUpload;
