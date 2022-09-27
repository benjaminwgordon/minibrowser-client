import React from "react";
import { AuthContext } from "../Contexts/Auth";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

// Forces a redirect back to the login page anytime a user attempts to navigate to a page before logging in

const PrivateOutlet = (props: React.PropsWithChildren) => {
  const { jwt } = useContext(AuthContext);
  return jwt === "" ? <Navigate to="/auth" /> : <Outlet />;
};

export default PrivateOutlet;
