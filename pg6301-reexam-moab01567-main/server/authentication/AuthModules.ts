export async function get_authorization_endpoint(
  discovery_endpoint: string,
): Promise<string> {
  const responseDiscoveryEndpoint = await fetch(discovery_endpoint);
  if (!responseDiscoveryEndpoint.ok) {
  }
  const { authorization_endpoint } = await responseDiscoveryEndpoint.json();

  return await authorization_endpoint;
}

export async function get_token_endpoint(
  discovery_endpoint: string,
): Promise<string> {
  const responseDiscoveryEndpoint = await fetch(discovery_endpoint);
  if (!responseDiscoveryEndpoint.ok) {
  }
  const { token_endpoint } = await responseDiscoveryEndpoint.json();

  return await token_endpoint;
}

export async function get_userinfo_endpoint(
  discovery_endpoint: string,
): Promise<string> {
  const responseDiscoveryEndpoint = await fetch(discovery_endpoint);
  if (!responseDiscoveryEndpoint.ok) {
  }
  const { userinfo_endpoint } = await responseDiscoveryEndpoint.json();

  return await userinfo_endpoint;
}
