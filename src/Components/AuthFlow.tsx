import React, { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Contexts/Auth";

const AuthFlow = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthFlow;
