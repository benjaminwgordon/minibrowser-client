import React, { useState } from "react";
import INewPost from "../API/types/INewPost";
import { AuthContext } from "../Contexts/Auth";
import { useContext } from "react";
import IPost from "../API/types/IPost";
import post, { RequestError } from "../API/Post";
import { useNavigate } from "react-router-dom";

interface INewPostFormMetadataProps {
  image: any;
}

const NewPostFormMetadata = (props: INewPostFormMetadataProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const { jwt } = useContext(AuthContext);
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
    <div style={{ width: "40%" }}>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0.5rem",
          }}
        >
          <label htmlFor="titleInput">Title</label>
          <input
            type="text"
            name="titleInput"
            id="titleInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ flexGrow: 1, marginLeft: "1rem" }}
          />
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
        <div>
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
