import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { SignupDto } from "./dtos/signup-dto";
import { User } from "./user.entity";
import { LoginDto } from "./dtos/login-dto";
import { GetUser } from "./get-user-decorator";
import { UpdateUserDto } from "./dtos/update-user-dto";
import {AuthGuard} from "@nestjs/passport";

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignupDto): Promise<User> {
    return this.userService.signUp(signUpDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<User> {
    return this.userService.login(loginDto);
  }

  @Patch('updateMe')
  @UseGuards(AuthGuard())
  async update(@GetUser() user: User, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const id = user.id;
    return this.userService.update(id, updateUserDto);
  }

  @Delete('deleteMe')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@GetUser() user: User) {
    const id = user.id;
    return this.userService.delete(id);
  }

}










