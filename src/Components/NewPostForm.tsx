import React, { useState } from "react";
import newPost from "../API/newPost";
import INewPost from "../API/types/INewPost";
import { AuthContext } from "../Contexts/Auth";
import { useContext } from "react";
import IPost from "../API/types/IPost";
import post, { RequestError } from "../API/Post";
import { useNavigate } from "react-router-dom";
import IRequestError from "../API/types/IRequestError";

const NewPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const { jwt } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setErrors([]);
    const body: INewPost = {
      title,
      content,
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
    <div>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="titleInput">Title</label>
        <input
          type="text"
          name="titleInput"
          id="titleInput"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="contentInput">Content</label>
        <input
          type="text"
          name="contentInput"
          id="contentInput"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <label htmlFor="descriptionInput">Description</label>
        <input
          type="text"
          name="descriptionInput"
          id="descriptionInput"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type="button" value="Submit" onClick={() => handleSubmit()} />
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

export default NewPostForm;