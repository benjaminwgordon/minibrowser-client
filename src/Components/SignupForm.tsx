import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postSignup from "../API/PostSignup";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

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
    const user = await postSignup<ISignup, IUser>("/auth/signup", {
      username,
      email,
      password,
    });
    if (user) {
      navigate(`/auth/confirm?email=${email}`);
    } else {
      console.log("failed to update auth token");
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div>
          {/* TODO: Input Company Logo Here */}
          <img
            src={require("../Media/brushStroke.png")}
            alt="brush stroke logo"
            className="mx-auto h-12 w-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Register to join the MiniBrowser community
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <button
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => navigate("/auth")}
            >
              sign in to an existing account
            </button>
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
          <div className="-space-y-px rounded-md shadow-sm">
            <label htmlFor="usernameInput" className="sr-only">
              Username
            </label>
            <input
              id="usernameInput"
              name="username"
              type="text"
              autoComplete="none"
              required
              className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
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
              className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
              Sign up
            </button>
          </div>
        </form>
        {/* {errors ? (
          <ul>
            {errors.map((error) => (
              <li>{error}</li>
            ))}
          </ul>
        ) : (
          <></>
        )} */}
      </div>
    </div>
  );
};

export default SignupForm;
