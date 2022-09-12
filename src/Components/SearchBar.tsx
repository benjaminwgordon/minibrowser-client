import React, { useState, useEffect, useContext } from "react";
import get from "../API/Get";
import { AuthContext } from "../Contexts/Auth";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSubmit = () => {};
  const { jwt } = useContext(AuthContext);
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
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        name="searchBarInput"
        id="searchBarInput"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {searchResult.length > 0 ? (
          searchResult.map((user) => <li key={user.id}>{user.username}</li>)
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};

export default SearchBar;
