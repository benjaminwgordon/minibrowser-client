import { Link } from "react-router-dom";

const EmailValidationSuccess = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="p-8 w-96 h-96 bg-white rounded-lg flex flex-col justify-center items-center bg-indigo-500 text-white">
        <p className="mb-2 text-lg">Thanks for confirming your email!</p>
        <img
          src={require("../../Media/brushStroke.png")}
          alt="brush stroke logo"
          className="mx-auto mb-10 h-24 w-auto"
        />
        <Link
          to="/auth"
          className="text-center bg-green-500 px-2 py-1 rounded-md"
        >
          Click here to sign in and begin browsing
        </Link>
      </div>
    </div>
  );
};

export default EmailValidationSuccess;
