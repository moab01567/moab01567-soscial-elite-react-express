import { LoginConfig } from "./AuthConfig";

export async function getUserInfo(
  userInfo_endpoint: string,
  authorization_header: string,
): Promise<any> {
  const user_info = await fetch(userInfo_endpoint, {
    headers: {
      Authorization: `${authorization_header}`,
    },
  });

  if (!user_info.ok) throw new Error("Failed to get User Info");
  return await user_info.json();
}

export async function googleCallback(
  loginConfig: LoginConfig,
  code: string,
): Promise<{ token_type: string; access_token: string }> {
  const requestBody = new URLSearchParams();
  requestBody.append("code", code);
  requestBody.append("client_id", loginConfig.client_id);
  requestBody.append("client_secret", loginConfig.client_secret);
  requestBody.append("redirect_uri", loginConfig.redirect_uri);
  requestBody.append("grant_type", "authorization_code");

  const request = new Request(await loginConfig.token_endpoint, {
    method: "POST",
    headers: loginConfig.headers,
    body: requestBody.toString(),
  });

  const tokenRes = await fetch(request);
  if (!tokenRes.ok) throw new Error("Request token failed");

  const body = await tokenRes.json();
  return { token_type: body.token_type, access_token: body.access_token };
}

export async function githubCallback(
  loginConfig: LoginConfig,
  code: string,
): Promise<{ token_type: string; access_token: string }> {
  const requestBody = new URLSearchParams();
  requestBody.append("code", code);
  requestBody.append("client_id", loginConfig.client_id);
  requestBody.append("client_secret", loginConfig.client_secret);

  const request = new Request(await loginConfig.token_endpoint, {
    method: "POST",
    headers: loginConfig.headers,
    body: JSON.stringify({
      code: code,
      client_id: loginConfig.client_id,
      client_secret: loginConfig.client_secret,
    }),
  });

  const tokenRes = await fetch(request);
  if (!tokenRes.ok) throw new Error("Request token failed");
  const body = await tokenRes.json();

  return { token_type: body.token_type, access_token: body.access_token };
}
