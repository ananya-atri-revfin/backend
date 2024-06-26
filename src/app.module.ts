import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { onLoginSchema } from './data/schema/onLogin.schema';
import { onRegisterSchema } from './data/schema/onRegister.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/fleetManagement'),
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
