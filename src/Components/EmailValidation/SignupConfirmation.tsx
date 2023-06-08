import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import post from "../../API/Post";

const SignupConfirmation = () => {
  const [validationCode, setValidationCode] = useState<string>("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const paramEmail = searchParams.get("email");
    if (!paramEmail) {
      navigate("/auth/emailConfirmationSuccess");
    } else {
      setEmail(paramEmail);
    }
  }, [navigate, searchParams]);

  const submitConfirmationForm = () => {
    post(`/auth/validateEmail`, {
      email: email,
      confirmationCode: validationCode,
    })
      .then(() => {
        // console.log({ emailconfirm: res });
        navigate("/auth/emailConfirmationSucess");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="p-8 w-96 h-96 bg-white rounded-lg flex flex-col justify-center items-center bg-indigo-500 text-white">
        <img
          src={require("../../Media/brushStroke.png")}
          alt="brush stroke logo"
          className="mx-auto mb-10 h-24 w-auto"
        />
        <p className="mb-2">Welcome to MiniBrowser!</p>
        <p className="text-center">
          Please check your email for a confirmation code and enter it below
        </p>
        <form>
          <div className="mt-2">
            <label htmlFor="validationCodeInput" className="sr-only"></label>
            <input
              name="validationCodeInput"
              type="text"
              className="h-8 text-black text-center text-lg"
              placeholder="validation code"
              value={validationCode}
              onChange={(e) => {
                setValidationCode(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col justify-center">
            <button
              onClick={() => submitConfirmationForm()}
              value={validationCode}
              className="text-white bg-green-500 self-center px-2 py-1 mt-2 rounded-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupConfirmation;
