import { APIUsers, EAuthority, ELoginType } from "../../shared/interface";
import * as userRepo from "./UserRepository";
import { HTTP_NOT_AUTHORIZED, HttpException } from "../HttpException";

export async function createOrUpdateUser(loginType: ELoginType, userInfo: any) {
  console.log(userInfo);
  if (loginType === ELoginType.google) {
    await userRepo.createOrUpdateUser({
      userId: userInfo.sub,
      email: userInfo.email,
      loginType: loginType,
      authority: EAuthority.reader,
      name: userInfo.name,
      picture: userInfo.picture,
    });
  } else {
    await userRepo.createOrUpdateUser({
      userId: userInfo.id + "",
      email: userInfo.emai ?? "",
      loginType: loginType,
      authority: EAuthority.publisher,
      name: userInfo.name ?? userInfo.login,
      picture: userInfo.avatar_url,
    });
  }
}

export async function getUserById(userId: string): Promise<APIUsers> {
  const user: APIUsers | null = await userRepo.getUserById(userId);
  if (!user)
    throw new HttpException(HTTP_NOT_AUTHORIZED, "You are not AUTHORIZED");
  return user;
}
