// like a standard post request, but doesn't require any auth token as the
// user does not exist yet

import constants from "./constants";

export class RequestError {
  statusCode: number;
  message: string[];

  constructor(statusCode: number, message: string[]) {
    this.statusCode = statusCode;
    this.message = message;
    // Errors are sometimes single strings, and sometimes arrays.
    // this wraps any single strings in an array to get easier error handling in UI
    if (!Array.isArray(message)) {
      this.message = [message];
    }
  }
}

export default async function postSignup<BodyType, ReturnType extends {}>(
  target: string,
  body: BodyType
): Promise<ReturnType> {
  // console.log({ baseURL: constants.baseURL });

  const result: ReturnType | RequestError = await fetch(
    constants.baseURL + target,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    }
  ).then((response) => {
    const out = response.json();
    // console.log({ out });
    return out;
  });

  if ("statusCode" in result) {
    if (result.statusCode == 401) {
      console.log("user not authorized");
    }
    throw new RequestError(result.statusCode, result.message);
  } else {
    return result as ReturnType;
  }
}
