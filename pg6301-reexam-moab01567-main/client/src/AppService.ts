import { APIUsers } from "../../shared/interface";

export const getAuthenticationFromServer =
  async (): Promise<APIUsers | null> => {
    const user = await fetch("/api/user");
    if (!user.ok) {
      return null;
    }
    return await user.json();
  };
