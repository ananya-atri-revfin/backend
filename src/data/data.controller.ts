import { Body, Controller, Get, Post } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('data')

export class DataController {

  constructor(private readonly dataService: DataService) {}

  @Post('send-otp')
  async sendOtp(@Body('email') email: string): Promise<void> {
    await this.dataService.sendOtp(email)
    // await this.authService.sendRecord(email, otp);
  }

  @Get('get-record')
  async getRecord(@Body('email') email: string){
    const rec = await this.dataService.getRecord(email);
    console.log(rec)
  }

  @Get('get-records')
  async getRecords(){
    const rec = await this.dataService.getRecords();
    console.log(rec)
  }
}