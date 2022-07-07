import http from "./http";
import Cookies from "js-cookie";
import { JwtPayload } from "../types";

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
    // TODO: Redirect to password overview
  }
  return accessToken;
};

export const signup = async (
  username: string,
  password: string
): Promise<void> => {
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

export const isAuthenticated = (): boolean => {
  const token: string | undefined = Cookies.get("token");
  if (token) {   
    if (parseJwt(token).exp * 1000 < new Date().getTime()) {
      Cookies.remove("token");
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

const parseJwt = function (token: string): JwtPayload {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(atob(base64));
};
