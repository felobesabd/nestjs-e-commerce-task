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

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
      isGlobal: true,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
