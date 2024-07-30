import { DataSource, EntityManager, Repository, UpdateResult } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Cart } from "./cart.entity";
import { User } from "../user/user.entity";
import { UpdateCartDto } from "./dto/update-cart-dto";

@Injectable()
export class CartRepository extends Repository<Cart> {
  constructor(private dataSource: DataSource) {
    super(Cart, dataSource.createEntityManager());
  }

  async rawQuery<T = any[]>(query: string, parameters: object = {}, manager?: EntityManager): Promise<T> {
    const conn = this.manager.connection;
    const [ escapedQuery, escapedParams ] = conn.driver.escapeQueryWithParameters(query, parameters, {});
    return conn.query(escapedQuery, escapedParams);
  }

  async getAllCart(user: User): Promise<Cart[]> {
    return await this.findBy({ user_id: user.id  });
  }

  async getOneCart(cartId: number): Promise<Cart> {
    return await this.findOne({ where: { id: cartId } });
  }

  async getTotalPrice(userId: number): Promise<number> {
    const totalPrice =
      await this.rawQuery<number>(`
           SELECT
              sum("cart"."price")
           FROM "cart"
              where
                  "user_id" = :user
      `,{
          user: userId,
        }
      );

    return totalPrice;
  }

  async updateCart(cartId: number, updateCart: UpdateCartDto): Promise<UpdateResult> {
    return await this.update(cartId, updateCart);
  }

  async deleteOneFromCart(cartId: number, userId: number): Promise<void> {
    const deleteOne = await this.delete({ id: cartId, user_id: userId })

    if (deleteOne.affected === 0) {
      throw new NotFoundException(`Not found cart for this id => ${cartId}`)
    }
  }

  async deleteUserCart(userId: number): Promise<void> {
    const deleteOne = await this.delete({ user_id: userId })

    if (deleteOne.affected === 0) {
      throw new NotFoundException(`Not found cart for this user id => ${userId}`)
    }
  }
}
