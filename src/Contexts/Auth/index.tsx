import React, { createContext, useState } from "react";

interface IAuthContext {
  jwt: string;
  updateJwt: (newJwt: string) => void;

  username: string;
  updateUsername: (newUsername: string) => void;

  userId: number;
  updateUserId: (newUserId: number) => void;
}

export const AuthContext = createContext<IAuthContext>({
  jwt: "",
  updateJwt: () => {},
  username: "",
  updateUsername: () => {},
  userId: -1,
  updateUserId: () => {},
});

export const AuthProvider = (props: React.PropsWithChildren<{}>) => {
  const [jwt, setJwt] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(-1);

  const updateJwt = (newJwt: string) => {
    setJwt(newJwt);
  };

  const updateUsername = (newUsername: string) => {
    setUsername(newUsername);
  };

  const updateUserId = (newUserId: number) => {
    setUserId(newUserId);
  };

  return (
    <AuthContext.Provider
      value={{ jwt, updateJwt, username, updateUsername, userId, updateUserId }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
