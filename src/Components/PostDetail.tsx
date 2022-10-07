import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

interface IPostProps {
  post: {
    id: number;
    title: string;
    content: string;
    authorId: number;
    author: { username: string };
    description: string;
  };
  close: () => void;
}

const PostDetail = (props: IPostProps) => {
  const { id, title, content, authorId, author, description } = props.post;
  console.log({ detailViewProps: props });
  const navigate = useNavigate();
  return (
    <div
      className="fixed top-0 left-0 z-10 w-screen h-screen backdrop-blur-sm backdrop-brightness-50 flex items-center justify-center"
      onClick={() => props.close()}
    >
      <div
        className="flex flex-col justify-start h-3/4 rounded-lg bg-white m-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-center border-b border-gray-200">
          <h3 className="flex items-center text-lg p-2">{title}</h3>
        </div>
        <div className="flex flex-row justify-stretch h-full">
          <div className="flex justify-center items-center bg-black ">
            <img
              src={content}
              alt="user uploaded content"
              loading="lazy"
              className="h-0 min-h-full object-contain"
            />
          </div>
          <div className="flex flex-col justify-between items-left w-1/3 p-2">
            <button
              onClick={() => navigate(`/user/${author.username}`)}
              className="flex flex-row items-center"
            >
              <UserCircleIcon className="w-8 h-8 hover:cursor-pointer " />
              <p className="pl-1 hover:cursor-pointer">{author.username}</p>
            </button>
            <p className="mt-2 pl-2 text-sm">{description}</p>
            <div className="flex justify-self-end">
              <ul>
                <li>comment #1</li>
                <li>comment #2</li>
                <li>comment #3</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
