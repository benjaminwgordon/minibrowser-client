import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import post, { RequestError } from "../API/Post";
import { AuthContext } from "../Contexts/Auth";
import { LockClosedIcon } from "@heroicons/react/20/solid";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const auth = useContext(AuthContext);

  let navigate = useNavigate();

  // if there is already a stored in-memory jwt, skip login page and nav directly to the pre-redirect target location
  useEffect(() => {
    if (auth.jwt !== "") {
      if (auth.previousLocation) {
        navigate(auth.previousLocation);
      } else {
        navigate("/post");
      }
    }
  }, [auth, navigate]);

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
    post<ILogin, IAuthToken>(auth, "/auth/signin", {
      email,
      password,
    })
      .then((result) => {
        auth.updateJwt(result.access_token);
        navigate("/post/feed");
      })
      .catch((error: RequestError) => {
        // console.log(error);
        setErrors(error.message);
      });
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          {/* TODO: Input Company Logo Here */}
          <img
            src={require("../Media/brushStroke.png")}
            alt="brush stroke logo"
            className="mx-auto h-12 w-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => navigate("signup")}
            >
              create a new account
            </a>
          </p>
        </div>
        <form className="mt-8">
          <div className="-space-y-px rounded-md shadow-sm">
            <label htmlFor="emailInput" className="sr-only">
              Email
            </label>
            <input
              id="emailInput"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="passwordInput" className="sr-only">
              Password
            </label>
            <input
              id="passwordInput"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div>
            <button
              onClick={() => handleSubmit()}
              type="button"
              className="group relative flex w-full justify-center rounded-b-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </form>
        {errors ? (
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
