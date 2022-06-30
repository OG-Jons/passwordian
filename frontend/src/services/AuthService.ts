import http from "./http";
import Cookies from "js-cookie";

export const login = async (
  username: string,
  password: string
): Promise<void> => {
  const accessToken = await http
    .post("/auth/signin", { username, password })
    .then((res) => res.data.accessToken)
    .catch((err) => {
      // TODO: Error handling
      console.log(err);
      return null;
    });

  if (accessToken) {
    await Cookies.set("token", accessToken);
    // TODO: Save User to React Context
    // TODO: Redirect to password overview
  }
  return accessToken;
};

const signup = async (username: string, password: string): Promise<void> => {
  http
    .post("/auth/signup", { username, password })
    .then(async (res) => {
      res.status === 201 && (await login(username, password));
    })
    .catch((err) => {
      console.log(err);
      return;
    });
};

const isAuthenticated = async (): Promise<boolean> => {
  const token = Cookies.get("token");
  return !!token;
};
