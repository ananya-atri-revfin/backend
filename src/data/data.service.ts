import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OTP } from './entitites/data.entity';
import { JwtService } from '@nestjs/jwt';
import { Users } from './entitites/user.entity';
import { nodeMailerConfig } from 'src/config/mail.config';

@Injectable()

export class DataService {

  constructor(
    @InjectRepository(OTP) private otpRepository: Repository<OTP>,
    @InjectRepository(Users) private dataRepository: Repository<Users>,
    private readonly jwtService: JwtService
  ) { }

  async sendOtp(email: string) {
    let user = await this.dataRepository.findOne({ where: { email } })
    if (!user) {
      // user = this.dataRepository.create({
      //   email
      // })
      // this.dataRepository.save(user)
      // console.log("New User Created!", email)
      console.log('Error! User does not exist')
      throw new HttpException("Invalid email id", HttpStatus.UNAUTHORIZED)
    }
    else {
      const nodemailer = require("nodemailer")
      const transporter = nodemailer.createTransport(nodeMailerConfig)
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      transporter.sendMail({
        from: 'marge.wehner21@ethereal.email',
        to: email,
        subject: 'OTP for Login',
        text: `Your OTP for login is: ${otp}`,
      });
      console.log("Message sent!", otp, email);
      let loggedUser = await this.otpRepository.findOne({ where: { email } })
      if (!loggedUser) {
        loggedUser = this.otpRepository.create({
          email, otp
        })
      }
      else {
        loggedUser.attempts = loggedUser.attempts + 1;
        // if (loggedUser.attempts > 3) {
        //   console.log("Maximum limit reached")
        //   return false;
        // }
        // else {
          loggedUser.otp = otp;
          loggedUser.updatedAt = new Date();
        // }
      }
      this.otpRepository.save(loggedUser);

      const payload = { sub: user.id };
      const token = await this.jwtService.signAsync(payload)
      console.log(token)
      user.token = token;
      return {message: "Email is correct!", token};
    }
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.otpRepository.findOne({ where: { email } })
    if (user && user.otp === otp) {
      user.isVerified = true;
      await this.otpRepository.save(user)
      console.log("logged in!", user);
      return {message: "OTP is correct!"}; 
    }
    else {
      console.log("Error", otp);
      throw new HttpException("Invalid otp", HttpStatus.UNAUTHORIZED)
    }
  }

  getRecord(email: string) {
    return this.otpRepository.findOneBy({ email })
  }

  getRecords() {
    return this.otpRepository.find()
  }
}