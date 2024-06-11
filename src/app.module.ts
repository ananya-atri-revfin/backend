import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthController } from './data/data.controller';
import { AuthModule } from './data/data.module';
import { AuthService } from './data/data.service';

import { typeOrmConfig } from './config/typeorm.config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { OTP } from './data/data.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([OTP]),
    TypeOrmModule.forFeature([JwtService]),
    AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
