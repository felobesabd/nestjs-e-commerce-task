import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import {Request, Response} from "express";

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const exceptionRes = exception.getResponse();
    const error = typeof res === 'string' ? {message: exceptionRes} : (exceptionRes as object);

    res.status(status).json({
      ...error,
      statusCode: status,
      timestamp: Date.now().toString(),
      path: req.url,
    })
  }
}