import { Body, Controller, Get, Post } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('data')

export class DataController {

  constructor(private readonly dataService: DataService) { }

  @Post('send-otp')
  async sendOtp(@Body('email') email: string) {
    return await this.dataService.sendOtp(email);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: { email: string, otp: string }) {
    const { email, otp } = body;
    return await this.dataService.verifyOtp(email, otp)
  }

  @Get('get-record')
  async getRecord(@Body('email') email: string) {
    const rec = await this.dataService.getRecord(email);
    console.log(rec)
  }

  @Get('get-records')
  async getRecords() {
    const rec = await this.dataService.getRecords();
    console.log(rec)
  }
}