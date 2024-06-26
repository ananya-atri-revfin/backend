import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
// import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { MongooseModule } from '@nestjs/mongoose';
import { onRegister, onRegisterSchema } from './schema/onRegister.schema';
import { onLogin, onLoginSchema } from './schema/onLogin.schema';
// dotenv.config();

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: onLogin.name, schema: onLoginSchema },
            { name: onRegister.name, schema: onRegisterSchema }]),
        DataModule,
        PassportModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { algorithm: 'HS256', expiresIn: '5m' }
        }),
    ],
    providers: [DataService],
    controllers: [DataController],
})
export class DataModule { }