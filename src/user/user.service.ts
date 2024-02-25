import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { SignupDto } from "./dtos/signup-dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dtos/login-dto";
import { UpdateUserDto } from "./dtos/update-user-dto";
import { UpdateResult } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignupDto): Promise<User> {
    const { username, email, password } = signUpDto;

    const user = new User;
    user.username = username;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPass(password, user.salt);

    try {
      await this.userRepo.save(user);
    } catch (e) {
      if (e.code === '23505') {
        console.log(e);
        throw new BadRequestException(`username or email already exist please changed`)
      }
    }
    delete user.password;
    delete user.salt;

    return user;
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { login, password } = loginDto;

    const user = (await this.userRepo.getUserByEmail(login)) || (await this.userRepo.getUserByUserName(login));

    if (!user || !await user.validationPass(password)) {
      throw new NotFoundException(`Invalid login or password`)
    }

    delete user.password;
    delete user.salt;

    const id = user.id;
    const payload = { id };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }

  async update(userId: number, updateUser: UpdateUserDto): Promise<User> {
    let userUpdated;

    try {
      userUpdated = await this.userRepo.updateUser(userId, updateUser);
    } catch (e) {
      if (e.code === '23505') {
        console.log(e);
        throw new BadRequestException(`username or email already exist please changed`)
      }
    }

    const selectedUser = await this.userRepo.getUserById(userId);
    delete selectedUser.salt;
    delete selectedUser.password;

    return selectedUser;
  }

  async delete(userId: number): Promise<void> {
    const product = await this.userRepo.delete({ id: userId });
    if (product.affected === 0) {
      throw new NotFoundException(`Not found Product for this id => ${userId}`)
    }
  }


  private async hashPass(pass: string, salt: string) {
    return bcrypt.hash(pass, salt)
  }
}
