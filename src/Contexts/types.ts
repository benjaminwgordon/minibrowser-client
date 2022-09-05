export type AuthState = {
  jwt: string;
};

export type AuthStateAction = {
  type: string;
  payload: any;
};
