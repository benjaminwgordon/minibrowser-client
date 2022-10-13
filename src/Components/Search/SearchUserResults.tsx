import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import IUser from "../../Types/IUser";

interface ISearchUserResultsProps {
  searchUserResult: IUser[];
  resetSearchUI: () => void;
}

const SearchUserResults = (props: ISearchUserResultsProps) => {
  const navigate = useNavigate();

  const searchTagResultItems = props.searchUserResult.map((user) => (
    <li
      key={user.id}
      onClick={() => {
        navigate(`/user/${user.username}`);
        props.resetSearchUI();
      }}
      className="flex w-full h-8 pl-5 items-center text-black hover:bg-gray-100"
    >
      <UserCircleIcon className="w-6 h-6 text-indigo-400 mr-2" />
      {user.username}
    </li>
  ));

  return <ul>{searchTagResultItems}</ul>;
};

export default SearchUserResults;
