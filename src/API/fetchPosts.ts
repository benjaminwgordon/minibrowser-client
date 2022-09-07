import constants from "./constants";
import IPost from "./types/IPost";

export default async function fetchPosts(
  jwt: string
): Promise<IPost[] | undefined> {
  return fetch(constants.baseURL + "/post", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
  }).then((response) => response.json());
}
