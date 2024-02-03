import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();

    const token = req.header('Authorization')? req.header('Authorization').split(' ')[1] : '';
    console.log(token);

    if (!token) {
      throw new UnauthorizedException('invalid token, please login again')
    }

    return true;
  }
}
