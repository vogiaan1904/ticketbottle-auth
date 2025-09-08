export enum ErrorCodeEnum {
  PermissionDenied = 10403,
  ValidationError = 10400,
  InternalServerError = 10500,
  NotFound = 10404,

  UserNotFound = 10000,
}

export const ErrorCode = Object.freeze<Record<ErrorCodeEnum, [string, number]>>(
  {
    [ErrorCodeEnum.ValidationError]: ['Invalid input', 400],
    [ErrorCodeEnum.PermissionDenied]: ['Permission denied', 403],
    [ErrorCodeEnum.NotFound]: ['Resource not found', 404],
    [ErrorCodeEnum.InternalServerError]: ['Internal server error', 500],
    [ErrorCodeEnum.UserNotFound]: ['User not found', 400],
  }
);
