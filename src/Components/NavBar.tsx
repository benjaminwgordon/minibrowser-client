import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const NavBar = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div>MiniBrowser</div>
      <SearchBar />
      <nav>
        <Link to={"/post"}>Feed</Link>
        <Link to={"/user/me"}>Profile</Link>
      </nav>
    </div>
  );
};

export default NavBar;
