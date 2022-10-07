// generic fetch GET functionality.  Provide expected return type as ReturnType

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
export default async function get<ReturnType extends {}>(
  jwt: string,
  target: string
): Promise<ReturnType> {
  const result: ReturnType | RequestError = await fetch(
    constants.baseURL + target,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": constants.baseURL,
        Authorization: "Bearer " + jwt,
      },
      credentials: "include",
    }
  ).then((response) => response.json());

  if ("statusCode" in result) {
    throw new RequestError(result.statusCode, result.message);
  } else {
    return result as ReturnType;
  }
}
