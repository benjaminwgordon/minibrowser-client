import { json } from "stream/consumers";
import constants from "./constants";
import INewPost from "./types/INewPost";
import IPost from "./types/IPost";

export default async function newPost(
  jwt: string,
  body: INewPost
): Promise<IPost[] | undefined> {
  try {
    return fetch(constants.baseURL + "/post", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    }).then((response) => response.json());
  } catch (error) {
    console.log(error);
  }
}
