import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";

export function asyncHandler(
  fn: RequestHandler
): RequestHandler {
  return (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
}

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {

  console.error(err);

  if (err?.errors) {
    return res.status(400).json({
      success: false,
      errors: err.errors,
    });
  }

  return res.status(err.status || 500).json({
    success: false,
    message:
      err.message || "Internal server error",
  });
}