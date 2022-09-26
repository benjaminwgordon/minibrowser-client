import React, { useState, useEffect, useContext } from "react";
import get from "../API/Get";
import { AuthContext } from "../Contexts/Auth";
import { useNavigate } from "react-router-dom";
import { request } from "http";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  const { jwt } = useContext(AuthContext);
  const navigate = useNavigate();

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

  return (
    <div
      className="relative"
      onFocus={() => {
        setIsSearchFocused(true);
      }}
      onBlur={(e) => {
        console.log({ e });
        if (!e.currentTarget.contains(document.activeElement)) {
          setIsSearchFocused(false);
        }
      }}
    >
      <input
        type="text"
        name="searchBarInput"
        id="searchBarInput"
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
                  setSearchTerm("");
                  setSearchResult([]);
                  navigate(`/user/${user.username}`);
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
