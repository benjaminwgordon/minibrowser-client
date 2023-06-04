import React, { createContext, useEffect, useState } from "react";
import { Location } from "react-router-dom";
import authTokenRefresh from "../../API/Auth/AuthTokenRefresh";
import get from "../../API/Get";
import IUser from "../../Types/IUser";

export interface IUserSession {
  username: string;
  updateUsername: (newUsername: string) => void;

  userId: number;
  updateUserId: (newUserId: number) => void;

  previousLocation: Location | undefined;
  updatePreviousLocation: (newPreviousLocation: Location | undefined) => void;

  fetchUserData: () => void;

  logout: () => void;
}

export const AuthContext = createContext<IUserSession>({
  username: "",
  updateUsername: () => {},
  userId: -1,
  updateUserId: () => {},
  previousLocation: undefined,
  updatePreviousLocation: () => {},
  fetchUserData: () => {},
  logout: () => {},
});

export const AuthProvider = (props: React.PropsWithChildren<{}>) => {
  const [username, setUsername] = useState<string>("");
  const [userId, setUserId] = useState<number>(-1);
  const [previousLocation, setPreviousLocation] = useState<Location>();

  useEffect(() => {
    const interval = setInterval(() => {
      authTokenRefresh<{ access_token: string }>("/auth/refreshToken")
        .then((res) => {
          if (res && res.access_token != "") {
          } else {
            setUsername("");
            setUserId(-1);
          }
        })
        .catch((err) =>
          console.log("Failed to fetch new auth token: ", { err })
        );
    }, 10000);
    return () => clearInterval(interval);
  }, [userId]);

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

  const fetchUserData = () => {
    get<IUser>("/user/me")
      .then((res) => {
        console.log("fetching user data: " + { res });
        if (res && res.id && res.username) {
          updateUserId(res.id);
          updateUsername(res.username);
        } else {
          logout();
        }
      })
      .catch((err) => {
        console.log("error while fetching active user info, logging out");
        console.log({ err });
        logout();
      });
  };

  const logout = () => {
    console.log("called logout");
    get<any>("/auth/logout")
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => {
        console.log({ err });
      });
    setUsername("");
    setUserId(-1);
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        updateUsername,
        userId,
        updateUserId,
        previousLocation,
        updatePreviousLocation,
        fetchUserData,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
