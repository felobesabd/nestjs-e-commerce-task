import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "../user.repository";
import { ConfigService } from "@nestjs/config";
import { User } from "../user.entity";
import { JwtPayloadInterface } from "./jwt-payload-interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userRepo: UserRepository,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<User> {
    const { id } = payload;
    const user = await this.userRepo.getUserById(id);

    if (!user) {
      throw new UnauthorizedException(`Invalid token.. please login again`)
    }

    return user;
  }
}