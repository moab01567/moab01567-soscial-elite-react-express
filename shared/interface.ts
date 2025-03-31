export enum EAuthority {
  reader,
  publisher,
}
export enum ELoginType {
  google,
  github,
}

export interface APIUsers {
  userId: string;
  name: string;
  picture: string;
  email: string;
  loginType: ELoginType;
  authority: EAuthority;
}

export interface APIMessage {
  ok: boolean;
  status: number;
  displayMessage: string;
  massage: string;
}
