import get from "../API/Get";
import IUser from "../API/types/IUser";

async function fetchUserData(jwt: string): Promise<IUser | undefined> {
  const userData = await get<IUser>(jwt, "user/me");
  if (userData !== undefined) {
    return userData as IUser;
  } else {
    return undefined;
  }
}
