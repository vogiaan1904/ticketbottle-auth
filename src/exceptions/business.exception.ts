import { ErrorCode, ErrorCodeEnum } from '@/constants/errors.constant';

export class BusinessException extends Error {
  public readonly statusCode: number;
  public readonly code: number;

  constructor(code: ErrorCodeEnum) {
    const [message, status] = ErrorCode[code];
    super(message);

    this.statusCode = status;
    this.code = code;

    Error.captureStackTrace(this);
  }
}
