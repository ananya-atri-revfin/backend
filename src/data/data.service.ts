// MAIL TEMPLATE

import { Injectable } from '@nestjs/common';
import { OTP } from './data.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()

export class DataService {

  constructor(@InjectRepository(OTP) private otpRepository: Repository<OTP>) {}

  async sendOtp(email: string) {
    const nodemailer = require("nodemailer")
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: 'marge.wehner21@ethereal.email',
        pass: 'QMBAYH7TrB18TcbP4A',
      },
    })
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    transporter.sendMail({
      from: 'marge.wehner21@ethereal.email',
      to: email,
      // to: 'ananya.atri@revfin.in',
      subject: 'OTP for Login',
      text: `Your OTP for login is: ${otp}`,
    });
    const newOtp = {email, otp}
    this.otpRepository.create( newOtp )
    console.log("Message sent!", otp, email)
    return this.otpRepository.save(newOtp)
  }

  getRecord(email: string){
    return this.otpRepository.findOneBy({email})
  }

  getRecords(){
    return this.otpRepository.find()
  }

  
}