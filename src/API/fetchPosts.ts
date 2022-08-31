import constants from "./constants";

export default async function fetchPosts(
  options?: any
): Promise<any | undefined> {
  try {
    let posts = await fetch(constants.baseURL + "/post");
    posts = await posts.json();
    return posts;
  } catch (error) {
    console.log(error);
  }
}
