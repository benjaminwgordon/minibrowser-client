import React, { useEffect } from "react";
import { AuthContext } from "../Contexts/UserSession";
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// Forces a redirect back to the login page anytime a user attempts to navigate to a page before logging in

const PrivateOutlet = () => {
  const { userId, fetchUserData, updatePreviousLocation } =
    useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    updatePreviousLocation(location);
    if (!userId) {
      fetchUserData();
    }
  }, [fetchUserData, location, updatePreviousLocation, userId]);

  return userId === -1 ? <Navigate to="/auth" /> : <Outlet />;
};

export default PrivateOutlet;
