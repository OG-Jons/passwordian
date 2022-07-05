export interface User {
  id?: number;
  username?: string;
  masterPassword?: string;
  passwords?: Password[];
  categories?: Category[];
}

export interface Password {
  id?: number;
  title?: string;
  website?: string;
  username?: string;
  password?: string;
  description?: string;
  category?:Category;
  user?: User;
}

export interface Category {
  id?: number;
  name?: string;
  user?: User;
  passwords?: Password[];
}
