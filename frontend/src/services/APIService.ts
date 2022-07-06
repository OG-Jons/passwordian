import { Category, Password } from "../types";
import http from "./http";

const extract = (data: any) => {
  return data.data;
};

/* Password section */

export const getUserPasswords = async (): Promise<Password[]> => {
  return http.get("/passwords").then(extract);
};

/**
 *
 * @param category if called with null returns all passwords without a category
 * @returns
 */
export const getUserPasswordsByCategory = async (
  category: Category | null
): Promise<Password[]> => {
  return http
    .get(`/passwords/category/${category?.id ? category.id : -1}`)
    .then(extract);
};

export const getPassword = async (id: number): Promise<Password> => {
  return http.get(`/passwords/${id}`).then(extract);
};

export const createUserPassword = async (
  password: Password
): Promise<Password> => {
  return http.post("/passwords", { ...password }).then(extract);
};

export const deleteUserPassword = async (id: number): Promise<null> => {
  return http.delete(`/passwords/${id}`).then(extract);
};

export const updateUserPassword = async (
  id: number,
  password: Password
): Promise<Password> => {
  return http.put(`/passwords/${id}`, { ...password }).then(extract);
};

/* Auth section */

export const login = async (
  username: string,
  password: string
): Promise<{ accessToken: string }> => {
  return http.post("/auth/signin", { username, password }).then(extract);
};

export const register = async (
  username: string,
  password: string
): Promise<null> => {
  return http.post("/auth/signup", { username, password }).then(extract);
};

export const updateMasterPassword = async (
  username: string,
  password: string,
  newPassword: string
): Promise<null> => {
  return http
    .put("/auth/master", { username, password, newPassword })
    .then(extract);
};

/* Category section */

export const getUserCategories = async (): Promise<Category[]> => {
  return http.get("/categories").then(extract);
};

export const getCategory = async (id: number): Promise<Category> => {
  return http.get(`/categories/${id}`).then(extract);
};

export const createUserCategory = async (
  category: Category
): Promise<Category> => {
  return http.post("/categories", { ...category }).then(extract);
};

export const deleteUserCategory = async (id: number): Promise<null> => {
  return http.delete(`/categories/${id}`).then(extract);
};

export const updateUserCategory = async (
  id: number,
  category: Category
): Promise<Category> => {
  return http.put(`/categories/${id}`, { ...category }).then(extract);
};
