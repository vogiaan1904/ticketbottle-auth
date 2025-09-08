export enum ErrorCodeEnum {
  PermissionDenied = 10403,
  ValidationError = 10400,
  InternalServerError = 10500,

  UserNotFound = 10000,
}

export const ErrorCode = Object.freeze<Record<ErrorCodeEnum, [string, number]>>(
  {
    [ErrorCodeEnum.ValidationError]: ['Invalid input', 400],
    [ErrorCodeEnum.PermissionDenied]: ['Permission denied', 403],
    [ErrorCodeEnum.InternalServerError]: ['Internal server error', 500],
    [ErrorCodeEnum.UserNotFound]: ['User not found', 400],
  }
);
