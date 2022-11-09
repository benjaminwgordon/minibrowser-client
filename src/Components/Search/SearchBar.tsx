import { useState, useEffect, useContext } from "react";
import get from "../../API/Get";
import { AuthContext } from "../../Contexts/Auth";
import { useLocation, useNavigate } from "react-router-dom";
import ITag from "../../Types/ITag";
import IUser from "../../Types/IUser";
import SearchUserResults from "./SearchUserResults";
import SearchTagResults from "./SearchTagResults";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  const { jwt } = useContext(AuthContext);
  const location = useLocation();

  const [searchUserResult, setSearchUserResult] = useState<IUser[]>([]);
  const [searchTagResult, setSearchTagResult] = useState<ITag[]>([]);

  const resetSearchUI = () => {
    setSearchTerm("");
    setSearchUserResult([]);
    setSearchTagResult([]);
    setIsSearchFocused(false);
  };

  useEffect(() => {
    if (searchTerm === "") {
      setSearchUserResult([]);
      setSearchTagResult([]);
    } else {
      Promise.all([
        get<IUser[]>(jwt, `/user/search?username=${searchTerm}`),
        get<ITag[]>(jwt, `/tag?name=${searchTerm}`),
      ]).then((res) => {
        setSearchUserResult(res[0].slice(0, 3));
        setSearchTagResult(res[1].slice(0, 3));
      });
    }
  }, [searchTerm, jwt]);

  // reset the state of the search bar if the user navigates away from current page view
  useEffect(() => {
    resetSearchUI();
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
        className="h-10 w-96 border border-gray-200 bg-gray-100 pl-5 outline-none"
        placeholder="Search"
        autoComplete="off"
      />
      {isSearchFocused &&
      (searchUserResult.length > 0 || searchTagResult.length > 0) ? (
        <div className="absolute w-96 bg-white rounded-bt-md border border-gray-200 h-48 z-50">
          {searchUserResult.length > 0 ? (
            <SearchUserResults
              resetSearchUI={() => resetSearchUI()}
              searchUserResult={searchUserResult}
            />
          ) : (
            <></>
          )}
          {searchTagResult.length > 0 ? (
            <SearchTagResults
              resetSearchUI={() => resetSearchUI()}
              searchTagResult={searchTagResult}
            />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchBar;
