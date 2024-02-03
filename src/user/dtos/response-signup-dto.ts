import { Exclude, Expose } from "class-transformer";

export class ResponseSignupDto {
  id: number;
  username: string;

  // @Expose({name: 'Email'})
  @Exclude()
  email: string;

  @Expose({name: 'Email'})
  get getEmail(): string {
    return `${this.email}`;
  }

  @Exclude()
  password: string;

  jwt: string;

  constructor(newUser: Partial<ResponseSignupDto>, jwt: string) {
    Object.assign(this, newUser)
  }
}