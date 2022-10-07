import React, { useContext, useState } from "react";
import post from "../API/Post";
import INewPost from "../API/types/INewPost";
import IPost from "../API/types/IPost";
import { AuthContext } from "../Contexts/Auth";
import ImageUpload from "./ImageUpload";
import NewPostFormMetadata from "./NewPostFormMetadata";
import { useNavigate } from "react-router-dom";
import postMultipart from "../API/PostMultipart";

interface INewPostFormProps {
  close: () => void;
}

const NewPostForm = (props: INewPostFormProps) => {
  const [image, setImage] = useState(undefined);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { jwt, username } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (image === undefined) {
      throw new Error();
    }
    const body: INewPost = {
      title,
      description,
      image,
    };
    postMultipart<INewPost, IPost>(jwt, "/post", body)
      .then((result) => {
        props.close();
        navigate(`/user/${username}`);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      {!image ? (
        <ImageUpload image={image} setImage={setImage} />
      ) : (
        <NewPostFormMetadata
          image={image}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          launchSubmit={() => {
            handleSubmit();
          }}
        />
      )}
    </div>
  );
};

export default NewPostForm;
