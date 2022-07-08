import { Category, Password } from "../types";

import sjcl from "sjcl";
import { createUserPassword, getPassword, getUserCategories, updateUserPassword } from "./APIService";

const decyptPassword = (password: Password, masterPassword: string): Password => {
  if (password.password) {
    const decrypted: string = sjcl.decrypt(masterPassword, JSON.parse(password.password));
    return {...password, password: decrypted};
  }
  return password;
};

const encyptPassword = (password: Password, masterPassword: string): Password => {
  if (password.password) {
    const encrypted: string = JSON.stringify(sjcl.encrypt(
      masterPassword,
      password.password
    ))
    return {...password, password: encrypted}
  }
  return password;
};

export const getDecryptedUserCategories = async (masterPassword: string): Promise<Category[]> => {
  const categories: Category[] = await getUserCategories();
  return categories.map((category: Category) => {
    category.passwords = category.passwords.map((password: Password) => decyptPassword(password, masterPassword))
    return category
  })
}

export const getDecryptedPassword = async (id: number, masterPassword: string)=>{
  const password: Password = await getPassword(id);
  return decyptPassword(password, masterPassword);
}

export const updateUserPasswordAndEncrypt = async (id: number, password: Password, masterPassword: string)=>{
  return updateUserPassword(id, encyptPassword(password, masterPassword))
}

export const createEncryptedUserPassword = async (password: Password, masterPassword: string)=>{
  return createUserPassword(encyptPassword(password, masterPassword));
}
