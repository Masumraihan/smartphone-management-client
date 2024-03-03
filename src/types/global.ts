export type TError = {
  success: boolean;
  message: string;
};

export type TResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};
