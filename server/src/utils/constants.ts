
export const ErrorEventEnum = Object.freeze({
  ALREADY_EXISTS: "ALREADY_EXISTS",
  NO_TOKEN: "NO_TOKEN",
  INVALID_TOKEN: "INVALID_TOKEN",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  ACCOUNT_LOCKED: "ACCOUNT_LOCKED",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  EXPIRED_TOKEN: "EXPIRED_TOKEN",
  UNAUTHORIZED: "UNAUTHORIZED",
  RATE_LIMITED: "RATE_LIMITED",
  SERVER_ERROR: "SERVER_ERROR",
});

export const GenErrorEnum = Object.freeze({
  PERMISSION_DENIED: {
    code: "PERMISSION_DENIED",
    message: "You lack permissions for this action.",
  },
  RATE_LIMITED: {
    code: "RATE_LIMITED",
    message: "You are sending messages too quickly.",
  },
  CONNECTION_ERROR: {
    code: "CONNECTION_ERROR",
    message: "Network issue, please retry.",
  },
});
