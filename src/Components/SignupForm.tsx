import { useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import login from "../API/login";
import post from "../API/Post";
import { AuthContext } from "../Contexts/Auth";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  interface ISignup {
    username: string;
    email: string;
    password: string;
  }

  interface IUser {
    username: string;
    email: string;
  }

  const handleSubmit = async () => {
    // const authToken = await login({ email, password });
    const user = await post<ISignup, IUser>("", "/auth/signup", {
      username,
      email,
      password,
    });
    if (user) {
      navigate("/");
    } else {
      console.log("failed to update auth token");
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="usernameInput">Username</label>
        <input
          id="usernameInput"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="emailInput">Email</label>
        <input
          id="emailInput"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="passwordInput">Password</label>
        <input
          id="passwordInput"
          type="text"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <input type="submit" value="login" onClick={handleSubmit} />
    </div>
  );
};

export default SignupForm;
