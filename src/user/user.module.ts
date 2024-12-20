import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UserRepository } from './User.Repository';
import { UserModel } from './User.Model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { UploadService } from './upload/upload.service';
import { TokenEmptyGuard, TokenExistGuard } from 'src/auth/guards/token.guard';
import { join } from 'path';
import * as express from 'express';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  SequelizeModule.forFeature([User]),
  JwtModule.register({
    secret: process.env.JWT_KEY,
    signOptions: { expiresIn: "60m" }
  }),
  MulterModule.registerAsync({
    useClass: UploadService,
  })],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService, UserRepository, UserModel, TokenEmptyGuard, TokenExistGuard],
})
export class UserModule { }
