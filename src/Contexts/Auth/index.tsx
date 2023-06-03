import React, { createContext, useEffect, useState } from "react";
import { Location } from "react-router-dom";
import IUser from "../../API/types/IUser";
import decodeJWT from "../../utils/decodeJwt";
import getUserData from "../../API/Auth/GetUserData";
import authTokenRefresh from "../../API/Auth/AuthTokenRefresh";

export interface IAuthContext {
  jwt: string;
  updateJwt: (newJwt: string) => void;

  username: string;
  updateUsername: (newUsername: string) => void;

  userId: number;
  updateUserId: (newUserId: number) => void;

  previousLocation: Location | undefined;
  updatePreviousLocation: (newPreviousLocation: Location | undefined) => void;

  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  jwt: "",
  updateJwt: () => {},
  username: "",
  updateUsername: () => {},
  userId: -1,
  updateUserId: () => {},
  previousLocation: undefined,
  updatePreviousLocation: () => {},
  logout: () => {},
});

export const AuthProvider = (props: React.PropsWithChildren<{}>) => {
  const [jwt, setJwt] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [userId, setUserId] = useState<number>(-1);
  const [previousLocation, setPreviousLocation] = useState<Location>();

  // TODO: reimplement refresh tokens for JWT

  useEffect(() => {
    const interval = setInterval(() => {
      if (jwt) {
        // only try to refresh auth token is user is signed in
        console.log("Attempting to refresh the auth token");
        authTokenRefresh<{ access_token: string }>(jwt, "/auth/refreshToken")
          .then((res) => {
            console.log({ res });
            if (res) {
              console.log("Successfully fetched new auth token");
              updateJwt(res.access_token);
            }
            // log user out
          })
          .catch((err) =>
            console.log("Failed to fetch new auth token: ", { err })
          );
      }
      return () => clearInterval(interval);
    }, 300000);
  });

  //catches unset in-memory jwts and attempts to reset them from session storage
  useEffect(() => {
    if (jwt === "") {
      const storedToken = localStorage.getItem("jwt");
      if (storedToken) {
        const decodedToken = decodeJWT(storedToken);
        const date = new Date();
        const currentTime = Math.floor(date.getTime() / 1000);
        if (currentTime > decodedToken.exp) {
          // invalidate stored token
          localStorage.removeItem("jwt");
          updateJwt("");
        } else {
          // use existing token
          updateJwt(storedToken);
        }
      }
    }
  }, [jwt]);

  useEffect(() => {
    async function fetchUserData(jwt: string) {
      const userData = await getUserData<IUser>(jwt, "/user/me");
      if (userData !== undefined) {
        setUserId(userData.id);
        setUsername(userData.username);
      } else {
        throw new Error("failed to update user data");
      }
    }
    const userData = fetchUserData(jwt).catch((err) => console.log(err));
  }, [jwt]);

  const updateJwt = (newJwt: string) => {
    localStorage.setItem("jwt", newJwt);
    setJwt(newJwt);
  };

  const updateUsername = (newUsername: string) => {
    setUsername(newUsername);
  };

  const updateUserId = (newUserId: number) => {
    setUserId(newUserId);
  };

  const updatePreviousLocation = (
    newPreviousLocation: Location | undefined
  ) => {
    setPreviousLocation(newPreviousLocation);
  };

  const logout = () => {
    setJwt("");
    setUsername("");
    setUserId(-1);
  };

  return (
    <AuthContext.Provider
      value={{
        jwt,
        updateJwt,
        username,
        updateUsername,
        userId,
        updateUserId,
        previousLocation,
        updatePreviousLocation,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
