import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import post, { RequestError } from "../API/Post";
import { AuthContext } from "../Contexts/Auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const { jwt, updateJwt } = useContext(AuthContext);

  let navigate = useNavigate();

  interface ILogin {
    email: string;
    password: string;
  }

  interface IAuthToken {
    access_token: string;
  }

  const handleSubmit = async () => {
    setErrors([]);
    // const authToken = await login({ email, password });
    post<ILogin, IAuthToken>(jwt, "/auth/signin", {
      email,
      password,
    })
      .then((result) => {
        updateJwt(result.access_token);
        navigate("/post");
      })
      .catch((error: RequestError) => {
        console.log(error);
        setErrors(error.message);
      });
  };

  return (
    <div>
      <form>
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
        <input type="button" value="login" onClick={handleSubmit} />
      </form>
      {errors ? (
        <ul>
          {errors.map((error) => (
            <li>{error}</li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LoginForm;
