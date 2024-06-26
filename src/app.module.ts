import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OTP } from './data/entitites/data.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Users } from './data/entitites/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { onLoginSchema } from './data/schema/onLogin.schema';
import { onRegisterSchema } from './data/schema/onRegister.schema';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/fleetManagement'),
    TypeOrmModule.forFeature([OTP, Users]),
    MongooseModule.forFeature([
      { name: 'onLogin', schema: onLoginSchema },
      { name: 'onRegister', schema: onRegisterSchema }
    ]),
    JwtModule,
    DataModule,
    PassportModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
