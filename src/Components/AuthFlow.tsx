import React from "react";
import { Link, Outlet } from "react-router-dom";

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
