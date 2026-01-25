// ^ API Success Response
declare type APISuccessResponse<T> = {
  message: string;
} & T;

//^ API Error Response
declare type APIErrorResponse = {
  error: string;
};

declare type APIResponse<T> =
  | APISuccessResponse<T>
  | APIErrorResponse;
