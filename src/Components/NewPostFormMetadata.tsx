import React, { useState } from "react";
import INewPost from "../API/types/INewPost";
import { AuthContext } from "../Contexts/Auth";
import { useContext } from "react";
import IPost from "../API/types/IPost";
import post, { RequestError } from "../API/Post";
import { useNavigate } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/outline";

interface INewPostFormMetadataProps {
  image: any;
}

const NewPostFormMetadata = (props: INewPostFormMetadataProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const { jwt, username } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setErrors([]);
    const body: INewPost = {
      title,
      description,
    };
    // const res = await newPost(jwt, body);
    post<INewPost, IPost>(jwt, "/post", body)
      .then((result) => {
        navigate("/post/feed");
      })
      .catch((error: RequestError) => {
        setErrors(error.message);
      });
  };

  return (
    <div className="w-1/2 h-1/2 bg-white rounded-lg">
      <form className="flex flex-col justify-center">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0.5rem",
          }}
        >
          <label htmlFor="titleInput" className="sr-only">
            Title
          </label>
          <input
            type="text"
            name="titleInput"
            id="titleInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="pl-2 w-full"
            placeholder="Title"
          />
          <div>
            <UserCircleIcon className="w-8 h-8 hover:cursor-pointer " />
            <p className="pl-1 hover:cursor-pointer">{username}</p>
          </div>
        </div>
        <img src={URL.createObjectURL(props.image)} alt="user uploaded image" />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0.5rem",
          }}
        >
          <label htmlFor="descriptionInput">Description</label>
          <input
            type="text"
            name="descriptionInput"
            id="descriptionInput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ flexGrow: 1, marginLeft: "1rem" }}
          />
        </div>
        <div className="bg-blue-300 flex justify-center items-center">
          <input type="button" value="Submit" onClick={() => handleSubmit()} />
        </div>
      </form>
      {errors ? (
        <ul>
          {errors.map((error) => (
            <li>{error}</li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NewPostFormMetadata;
