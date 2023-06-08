import { useState, useContext } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { AuthContext } from "../../Contexts/UserSession";

interface INewPostFormMetadataProps {
  image: File | undefined;
  description: string;
  setDescription: (description: string) => void;
  title: string;
  setTitle: (title: string) => void;
  nextStep: () => void;
  previousStep: () => void;
}

const NewPostFormMetadata = (props: INewPostFormMetadataProps) => {
  const {
    image,
    description,
    setDescription,
    title,
    setTitle,
    nextStep,
    previousStep,
  } = props;
  const { username } = useContext(AuthContext);
  const [errors, setErrors] = useState<string>("");

  return (
    <div className="w-full h-full flex flex-col items-center bg-gray-100">
      <div className="w-full flex flex-row justify-between items-center h-12 px-4 border-b bg-white">
        <button
          type="button"
          onClick={() => previousStep()}
          className="text-blue-400"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h3 className="mx-4">Add Description</h3>
        <input
          type="button"
          value="next"
          onClick={() => {
            setErrors("");
            if (title === "" || description === "") {
              setErrors("Please add a title and caption to continue");
            } else {
              setErrors("");
              nextStep();
            }
          }}
          className="text-blue-400 hover:cursor-pointer"
        />
      </div>
      <div className="h-full py-4 flex flex-col justify-center items-center">
        {errors ? <p className="text-red-400">{errors}</p> : <></>}
        <form className="flex flex-col w-96 justify-start items-center bg-white rounded-lg border m-8">
          <div className="w-full flex flex-row justify-between items-center border-b px-5 h-10">
            <label htmlFor="titleInput" className="sr-only">
              Title
            </label>
            <input
              type="text"
              name="titleInput"
              id="titleInput"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-lg "
              placeholder="Write a title..."
            />
            <div className="flex flex-row">
              <UserCircleIcon className="w-8 h-8 hover:cursor-pointer " />
              <p className="pl-1">{username}</p>
            </div>
          </div>
          <div className="w-full bg-black">
            {
              <img
                src={image ? URL.createObjectURL(image) : "undefined"}
                alt="user upload"
                className="max-w-full max-h-full h-full w-full object-contain"
              />
            }
          </div>
          <div className="w-full px-4 py-1 border-t">
            <label htmlFor="descriptionInput" className="sr-only">
              Description
            </label>
            <textarea
              name="descriptionInput"
              id="descriptionInput"
              placeholder="Enter a caption..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-24 p-1"
              maxLength={128}
              wrap="hard"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPostFormMetadata;
