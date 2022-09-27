import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import NewPostFormMetadata from "./NewPostFormMetadata";

const NewPostForm = () => {
  const [image, setImage] = useState(undefined);

  return (
    <div className="w-full h-full flex items-center justify-center">
      {!image ? (
        <ImageUpload image={image} setImage={setImage} />
      ) : (
        <NewPostFormMetadata image={image} />
      )}
    </div>
  );
};

export default NewPostForm;
