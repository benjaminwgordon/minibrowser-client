import { json } from "stream/consumers";
import constants from "./constants";
import LoginForm from "./types/LoginForm";

export default async function login(loginForm: LoginForm) {
  try {
    console.log({ loginData: JSON.stringify(loginForm) });
    const data = await fetch(constants.baseURL + "/auth/signin", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(loginForm),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await data.json();
  } catch (error) {
    console.log({ error });
  }
}
