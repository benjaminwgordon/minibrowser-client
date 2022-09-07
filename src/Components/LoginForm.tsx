import { useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import login from "../API/login";
import { AuthContext } from "../Contexts/Auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { jwt, updateJwt } = useContext(AuthContext);

  let navigate = useNavigate();

  const handleSubmit = async () => {
    const authToken = await login({ email, password });
    if (authToken) {
      updateJwt(authToken);
      navigate("/post");
    } else {
      console.log("failed to update auth token");
    }
  };

  return (
    <div>
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

export default LoginForm;
