import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { DataService } from '../data/data.service';
import { AuthController } from './auth.controller';
import { DataModule } from 'src/data/data.module';

import { JwtStrategy } from '../data/jwt.strategy';
import { LocalStrategy } from '../data/local.strategy';

import { TypeOrmModule } from '@nestjs/typeorm';
import { OTP } from 'src/data/entitites/data.entity';
import { jwtConstants } from '../data/constants';
import { Users } from 'src/data/entitites/user.entity';



@Module({
    imports: [
        TypeOrmModule.forFeature([OTP, Users]),
    DataModule,
    PassportModule,
    JwtModule.register({
      global: true,
        secret: jwtConstants.secret,
        signOptions: { algorithm: 'HS256', expiresIn: '5m'}
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    })],
    providers: [AuthService, DataService, JwtService, 
      JwtStrategy, LocalStrategy
    ],
    exports: [AuthService],
    controllers: [AuthController]
})
export class AuthModule { }
