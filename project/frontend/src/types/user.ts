export type User = {
  token: string,
};

export const EmptyUser: User = {
  token: '',
};

export type Profile = {
  status: string,
  course: Number,
  avg_score: Number,
};

export type Account = {
  name: string,
  email: string,
  is_teacher: boolean,
  profile: Profile,
};

export type UserCredentials = {
  email: string,
  password: string,
};

export type RegisterCredentials = {
  username: string,
  email: string,
  password: string,
  re_password: string,
};

export type ResetCredentials = {
  current_password: string,
  password: string,
  re_password: string,
};

export type ConfirmResetCredentials = {
  uid: string,
  token: string,
  current_password: string,
  password: string,
  re_password: string,
};
