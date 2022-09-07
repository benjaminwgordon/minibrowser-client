import React from "react";
import { AuthContext } from "../Contexts/Auth";
import { useContext } from "react";
import LoginForm from "./LoginForm";

// Forces a redirect back to the login page anytime a user attempts to navigate to a page before logging in

const AuthGuard = (props: React.PropsWithChildren) => {
  const { jwt } = useContext(AuthContext);

  return jwt !== "" ? <>{props.children}</> : <LoginForm />;
};

export default AuthGuard;
