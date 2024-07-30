import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from './database/database.module';
import * as Joi from 'joi';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'path';
import { ProductModule } from './product/product.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { OrderModule } from "./order/order.module";
import { OrderItemsModule } from './order-items/order-items.module';
import { WishlistModule } from './wishlist/wishlist.module';
import * as path from "path";
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from "nestjs-i18n";
import { CartModule } from "./cart/cart.module";

@Module({
  imports: [
    // ConfigModule
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
      isGlobal: true,
    }),

    // I18nModule
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),

    CategoryModule,
    DatabaseModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/' //last slash was important
    }),
    ProductModule,
    SharedModule,
    UserModule,
    OrderModule,
    OrderItemsModule,
    WishlistModule,
    CartModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
