import React, { useEffect } from "react";
import { AuthContext } from "../Contexts/Auth";
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// Forces a redirect back to the login page anytime a user attempts to navigate to a page before logging in

const PrivateOutlet = (props: React.PropsWithChildren) => {
  const { jwt, updatePreviousLocation } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    updatePreviousLocation(location);
  }, [location]);

  return jwt === "" ? <Navigate to="/auth" /> : <Outlet />;
};

export default PrivateOutlet;
