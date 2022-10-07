// generic fetch GET functionality.  Provide expected return type as ReturnType

import { forEachChild } from "typescript";
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

export default async function postMultipart<BodyType, ReturnType extends {}>(
  jwt: string,
  target: string,
  body: BodyType
): Promise<ReturnType> {
  const multipartBody = new FormData();
  for (let field in body) {
    multipartBody.append(field, body[field] as string | Blob);
  }

  const result: ReturnType | RequestError = await fetch(
    constants.baseURL + target,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": constants.baseURL,
        Authorization: "Bearer " + jwt,
      },
      body: multipartBody,
      credentials: "include",
    }
  ).then((response) => response.json());

  console.log({ result });

  if ("statusCode" in result) {
    throw new RequestError(result.statusCode, result.message);
  } else {
    return result as ReturnType;
  }
}
