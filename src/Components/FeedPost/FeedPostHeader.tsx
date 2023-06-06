import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import { useNavigate } from "react-router-dom";

type FeedPostHeaderProps = {
  title: string;
  author: { username: string; id: number };
};

const FeedPostHeader = (props: FeedPostHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-between items-center px-2 py-1 border-b border-gray-100">
      <div className="flex flex-row">
        <UserCircleIcon className="w-8 h-8 hover:cursor-pointer " />
        <a
          onClick={() => navigate(`/user/${props.author.username}`)}
          className="flex flex-row items-center"
        >
          <p className="pl-1 hover:cursor-pointer">{props.author.username}</p>
        </a>
      </div>
      {/* <h3 className="flex items-center text-lg h-10">{props.title}</h3> */}
    </div>
  );
};

export default FeedPostHeader;
