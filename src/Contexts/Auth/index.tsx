import React, { createContext, useEffect, useState } from "react";

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

  //catches unset jwts and attempts to reset them from session storage
  useEffect(() => {
    if (jwt === "") {
      const storedToken = sessionStorage.getItem("jwt");
      console.log(storedToken);
      if (storedToken) {
        updateJwt(storedToken);
      }
    }
  }, []);

  const updateJwt = (newJwt: string) => {
    sessionStorage.setItem("jwt", newJwt);
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
