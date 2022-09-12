// generic fetch GET functionality.  Provide expected return type as ReturnType

import constants from "./constants";

export default async function get<ReturnType>(
  jwt: string,
  target: string
): Promise<ReturnType> {
  const result: ReturnType = await fetch(constants.baseURL + target, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
  })
    .then((response) => response.json())
    .then((data) => data as ReturnType);

  return result;
}
