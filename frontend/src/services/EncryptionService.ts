import { Password } from "../types";

import sjcl from "sjcl";

const decyptPassword = (password: Password, masterPassword: string): string => {
  if (password.password) {
    return sjcl.decrypt(masterPassword, JSON.parse(password.password));
  }
  return "";
};

const encyptPassword = (password: Password, masterPassword: string): string => {
  if (password.password) {
    return JSON.stringify(sjcl.encrypt(
        masterPassword,
        password.password
      ))
  }
  return "";
};
