import { useState, useEffect, useContext } from "react";
import get from "../API/Get";
import { AuthContext } from "../Contexts/Auth";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  const { jwt } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [searchResult, setSearchResult] = useState<
    { id: number; username: string }[]
  >([]);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResult([]);
    } else {
      get<{ id: number; username: string }[]>(
        jwt,
        `/user/search?username=${searchTerm}`
      )
        .then((res) => {
          setSearchResult(res);
        })
        .catch((error) => {
          setSearchResult([]);
          console.log(error);
        });
    }
  }, [searchTerm, jwt]);

  // reset the state of the search bar if the user navigates away from current page view
  useEffect(() => {
    setSearchTerm("");
    setIsSearchFocused(false);
  }, [location]);

  return (
    <div
      className="relative p-2"
      onFocus={() => {
        setIsSearchFocused(true);
      }}
    >
      <input
        type="text"
        name="searchBarInput"
        id="searchBarInput"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-10 w-80 border border-gray-200 bg-gray-100 rounded-md pl-5 outline-none"
        placeholder="Search"
        autoComplete="off"
      />
      {isSearchFocused ? (
        <ul className="absolute w-full bg-white rounded-bt-md border border-gray-200 h-48">
          {searchResult.length > 0 ? (
            searchResult.map((user) => (
              <li
                key={user.id}
                onClick={() => {
                  navigate(`/user/${user.username}`);
                  setSearchTerm("");
                  setSearchResult([]);
                  setIsSearchFocused(false);
                }}
                className="flex w-full h-8 pl-5 items-center text-black hover:bg-gray-100"
              >
                {user.username}
              </li>
            ))
          ) : (
            <li className="flex w-full h-8 pl-5 items-center text-black">
              Search for a user
            </li>
          )}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchBar;
