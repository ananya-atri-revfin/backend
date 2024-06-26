import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { onLogin } from './schema/onLogin.schema';
import { onRegister } from './schema/onRegister.schema';
import { JwtService } from '@nestjs/jwt';
import { nodeMailerConfig } from 'src/config/mail.config';

@Injectable()
export class DataService {

  constructor(
    @InjectModel(onRegister.name) private onRegisterModel: Model<onRegister>,
    @InjectModel(onLogin.name) private onLoginModel: Model<onLogin>,
    private readonly jwtService: JwtService
  ) { }

  async connectCollection() {
    try { await mongoose.connect('mongodb://127.0.0.1:27017/fleetManagement'); }
    catch (error) { throw new HttpException("Connection Disturbed", HttpStatus.SERVICE_UNAVAILABLE) } // 503
  }

  async sendOtp(email: string) {
    this.connectCollection;
    let regUser = await this.onRegisterModel.findOne({ email }).exec()
    if (!regUser) {
      // await this.onRegisterModel.create({ email: email })
      throw new HttpException("Invalid email id", HttpStatus.UNAUTHORIZED) // 401
    }
    else {
      let logUser = await this.onLoginModel.findOne({ email: email }).exec()
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const nodemailer = require("nodemailer")
      const transporter = nodemailer.createTransport(nodeMailerConfig)
      const mailOptions = {
        from: 'nodemailer.otp.sender@gmail.com',
        to: email,
        subject: 'OTP for Login',
        text: `Your OTP for login is: ${otp}`,
      }
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) { throw new HttpException("Unable to send Email, please try again later", HttpStatus.BAD_REQUEST); } // 400
        else { return info; }
      });
      if (!logUser) {
        const newId = await this.onLoginModel.countDocuments().exec() + 1;
        const newLogUser = await this.onLoginModel.create({ email, otp, _id: newId });
        newLogUser.attempts = 1;
        newLogUser.save();
      }
      else {
        logUser.attempts = logUser.attempts + 1;
        const now = new Date();
        if (logUser.attempts > 3 && ((Date.now() - logUser.updatedAt.getTime()) / 60000 < 5)) { 
          throw new HttpException("Maximum limit reached!", HttpStatus.NOT_ACCEPTABLE)
        }
        else {
          logUser.updatedAt = now;
          logUser.otp = otp;
          logUser.save();
        }
      }
    }
  }

  async verifyOtp(email: string, otp: string) {
    this.connectCollection;
    let regUser = await this.onRegisterModel.findOne({ email }).exec()
    let logUser = await this.onLoginModel.findOne({ email }).exec()
    if (regUser && logUser && logUser.otp === otp) {
      logUser.isVerified = true;
      logUser.attempts = 0;
      logUser.save();
      const payload = { sub: regUser._id };
      const token = await this.jwtService.signAsync(payload)
      const name = regUser.name;
      const occupation = regUser.occupation;
      regUser.isLogged = true;
      regUser.save()
      return { token, name, occupation }
    }
    else { throw new HttpException("Invalid otp", HttpStatus.UNAUTHORIZED) }
  }
}