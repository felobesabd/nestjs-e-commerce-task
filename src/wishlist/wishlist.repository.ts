import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Wishlist } from "./wishlist.entity";

@Injectable()
export class WishlistRepository extends Repository<Wishlist> {
  constructor(private dataSource: DataSource) {
    super(Wishlist, dataSource.createEntityManager());
  }


}