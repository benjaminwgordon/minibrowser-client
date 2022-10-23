import { useContext, useState } from "react";
import INewPost from "../../API/types/INewPost";
import IPost from "../../API/types/IPost";
import { AuthContext } from "../../Contexts/Auth";
import ImageUpload from "./ImageUpload";
import NewPostFormMetadata from "./NewPostFormMetadata";
import { useNavigate } from "react-router-dom";
import postMultipart from "../../API/PostMultipart";
import NewPostTags from "./NewPostTags";
import ITag from "../../Types/ITag";
import post from "../../API/Post";
import { PropagateLoader } from "react-spinners";

interface INewPostFormProps {
  close: () => void;
}

enum NewPostFormSteps {
  ImageUpload,
  Metadata,
  Tags,
  Recipes,
}

const NewPostForm = (props: INewPostFormProps) => {
  const progressiveFormStepOrder: NewPostFormSteps[] = [
    NewPostFormSteps.ImageUpload,
    NewPostFormSteps.Metadata,
    NewPostFormSteps.Tags,
    NewPostFormSteps.Recipes,
  ];

  const [currentPostFormStep, setCurrentPostFormStep] =
    useState<NewPostFormSteps>(NewPostFormSteps.ImageUpload);

  const [image, setImage] = useState(undefined);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPostReady, setIsPostReady] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [tags, setTags] = useState<ITag[]>([]);
  const { jwt, username } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsUploading(true);
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
        // if user added tags, upload them
        console.log({ newPostResult: result });
        if (tags.length !== 0) {
          post<{ post: IPost; tags: ITag[] }, IPost & ITag[]>(
            jwt,
            `/post/${result.id}/tag`,
            { post: result, tags }
          ).then((res) => {
            setIsUploading(false);
            props.close();
            navigate(`/user/${username}`);
          });
        }
      })
      .catch((error) => {
        console.log({ error });
        props.close();
        setIsUploading(false);
      });
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      {isUploading ? (
        <div className="w-96 h-96 bg-white rounded-lg flex flex-col justify-center items-center">
          <p className="mb-2 text-indigo-400 text-xl">Uploading your image</p>
          <PropagateLoader size={20} color={"#818cf8"} />
        </div>
      ) : !image ? (
        <ImageUpload image={image} setImage={setImage} />
      ) : !isPostReady ? (
        <NewPostFormMetadata
          image={image}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          back={() => setImage(undefined)}
          launchSubmit={() => {
            setIsPostReady(true);
          }}
        />
      ) : (
        <NewPostTags
          tags={tags}
          setTags={setTags}
          launchSubmit={() => handleSubmit()}
          back={() => setIsPostReady(false)}
        />
      )}
    </div>
  );
};

export default NewPostForm;
