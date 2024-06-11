import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { OTP } from './data.entity';

@Module({
    imports:[TypeOrmModule.forFeature([OTP])],
    providers:[DataService],
    controllers:[DataController]
})
export class DataModule {}