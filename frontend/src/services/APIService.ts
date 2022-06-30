import { Category, Password } from "../types";
import http from "./http";

const extract = (data: any) => {
  return data.data;
};

/* Password section */

export const getUserPasswords = async () => {
  return http.get("/passwords").then(extract);
};

export const getPassword = async (id: number) => {
  return http.get(`/passwords/${id}`).then(extract);
};

export const createUserPassword = async (password: Password) => {
  return http.post("/passwords", { ...password }).then(extract);
};

export const deleteUserPassword = async (id: number) => {
  return http.delete(`/passwords/${id}`).then(extract);
};

export const updateUserPassword = async (id: number, password: Password) => {
  return http.put(`/passwords/${id}`, { ...password }).then(extract);
};

/* Auth section */

export const login = async (username: string, password: string) => {
  return http.post("/auth/signin", { username, password }).then(extract);
};

export const register = async (username: string, password: string) => {
  return http.post("/auth/signup", { username, password }).then(extract);
};

/* Category section */

export const getUserCategories = async () => {
  return http.get("/categories").then(extract);
};

export const getCategory = async (id: number) => {
  return http.get(`/categories/${id}`).then(extract);
};

export const createUserCategory = async (category: Category) => {
  return http.post("/categories", { ...category }).then(extract);
};

export const deleteUserCategory = async (id: number) => {
  return http.delete(`/categories/${id}`).then(extract);
};

export const updateUserCategory = async (id: number, category: Category) => {
  return http.put(`/categories/${id}`, { ...category }).then(extract);
};
