import { Injectable } from "@nestjs/common";
import { DataSource, Repository, UpdateResult } from "typeorm";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dtos/update-user-dto";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getUserById(userId: number): Promise<User> {
    const user = await this.findOne({ where: { id: userId } });
    return user;
  }

  async getUserByUserName(username: string): Promise<User> {
    const user = await this.findOneBy({ username: username });
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.findOneBy({ email });
    return user;
  }

  async updateUser(userId: number, updateUser: UpdateUserDto): Promise<UpdateResult> {
    const userUpdated = await this.update(userId, updateUser);
    return userUpdated;
  }
}