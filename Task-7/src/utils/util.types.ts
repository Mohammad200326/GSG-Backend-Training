export const HTTPErrorStatus = {
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  InternalServerError: 500,
} as const;

export type HttpErrorStatusType = typeof HTTPErrorStatus;

export type ErrorStatusCode = HttpErrorStatusType[keyof HttpErrorStatusType];
