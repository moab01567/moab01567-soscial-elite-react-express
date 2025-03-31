import { APIMessage } from "../shared/interface";

export function checkException(error: any): APIMessage {
  if (error instanceof HttpException) {
    return error.apiMessage;
  } else {
    console.log(error);
    return HTTP_SERVER_ERROR;
  }
}

export class HttpException extends Error {
  apiMessage: APIMessage;
  constructor(apiMessage: APIMessage, displayMessage: string) {
    super();
    this.apiMessage = apiMessage;
    this.apiMessage.displayMessage = displayMessage;
  }
}
export const HTTP_BAD_REQUEST: APIMessage = {
  ok: false,
  displayMessage: "BAD REQUEST",
  status: 400,
  massage: "BAD REQUEST",
};
export const HTTP_NOT_AUTHORIZED: APIMessage = {
  ok: false,
  displayMessage: "NOT AUTHORIZED",
  status: 401,
  massage: "NOT AUTHORIZED",
};
export const HTTP_SERVER_ERROR: APIMessage = {
  ok: false,
  displayMessage: "There is a problem with the server",
  status: 500,
  massage: "Server Error",
};
