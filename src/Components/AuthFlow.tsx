import React, { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Contexts/Auth";

const AuthFlow = () => {
  return (
    <div>
      <nav>
        <Link to="login">Login</Link>
        <Link to="signup">Sign up</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default AuthFlow;
