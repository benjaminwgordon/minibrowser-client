import React from "react";
import { useState } from "react";

const ImageUpload = () => {
  const [image, setImage] = useState<File>();

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  return image ? (
    <div>
      <img src={URL.createObjectURL(image)} alt="user uploaded image" />
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
