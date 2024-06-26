import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { OTP } from './entitites/data.entity';
import * as dotenv from 'dotenv';
import { Users } from './entitites/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { MongooseModule } from '@nestjs/mongoose';
import { onRegister, onRegisterSchema } from './schema/onRegister.schema';
import { onLogin, onLoginSchema } from './schema/onLogin.schema';
dotenv.config();

@Module({
    imports: [
        TypeOrmModule.forFeature([OTP, Users]),
        MongooseModule.forFeature([
            { name: onLogin.name, schema: onLoginSchema },
            { name: onRegister.name, schema: onRegisterSchema }]),
        DataModule,
        PassportModule,
        JwtModule.register({
            global: true,
              secret: jwtConstants.secret,
              signOptions: { algorithm: 'HS256', expiresIn: '5m'}
          }),
    ],
    providers: [DataService],
    controllers: [DataController],
})
export class DataModule { }