import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import NewPostFormMetadata from "./NewPostFormMetadata";

const NewPostForm = () => {
  const [image, setImage] = useState(undefined);

  return (
    <div className="w-full h-full flex justify-center items-center bg-indigo-900">
      <div className="transition-transform ease-in-out duration-300 flex flex-col justify-center items-center">
        {!image ? (
          <ImageUpload image={image} setImage={setImage} />
        ) : (
          <NewPostFormMetadata image={image} />
        )}
      </div>
    </div>
  );
};

export default NewPostForm;
