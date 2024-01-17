import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService)=> ({
        type: 'postgres',
        host: configService.get('PG_HOST'),
        port: configService.get('PG_PORT'),
        username: configService.get('PG_USERNAME'),
        password: configService.get('PG_PASSWORD'),
        database: configService.get('PG_NAME'),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true,
      })
    })
  ],
})

export class DatabaseModule {}
