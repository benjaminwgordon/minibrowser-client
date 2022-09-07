import constants from "./constants";
import ILoginForm from "./types/LoginForm";

export default async function login(
  loginForm: ILoginForm
): Promise<string | null> {
  const response = await fetch(constants.baseURL + "/auth/signin", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(loginForm),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const res: any = await response.json();
    if (res) {
      const authToken: string = res.access_token;
      return authToken;
    } else {
      return Promise.reject(new Error("JSON parse failed"));
    }
  } else {
    return Promise.reject(new Error("Error" + response.status));
  }
}
