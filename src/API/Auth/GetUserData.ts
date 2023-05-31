/**
 * Used to populate the user data held in the main auth context
 *
 * Is seperated from the generic get request implementation, as the information
 * it fetches is used to populate the auth context object that is used to make
 * all other API requests in the future
 */
import constants from "../constants";

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
export default async function getUserData<ReturnType extends {}>(
  jwt: string,
  target: string
): Promise<ReturnType> {
  console.log("fetching user info with jwt: ", jwt);
  const result: ReturnType | RequestError = await fetch(
    constants.baseURL + target,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      credentials: "include",
    }
  ).then((response) => response.json());

  console.log("fetched user data: ", { result });

  if ("statusCode" in result) {
    throw new RequestError(result.statusCode, result.message);
  } else {
    return result as ReturnType;
  }
}
