import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Db, Repository } from 'typeorm';
import { OTP } from './entitites/data.entity';
import { JwtService } from '@nestjs/jwt';
import { Users } from './entitites/user.entity';
import { nodeMailerConfig } from 'src/config/mail.config';
import { onLogin } from './schema/onLogin.schema';
import { onRegister } from './schema/onRegister.schema';

@Injectable()

export class DataService {

  constructor(
    @InjectModel(onRegister.name) private onRegisterModel: Model<onRegister>,
    @InjectModel(onLogin.name) private onLoginModel: Model<onLogin>,
    @InjectRepository(OTP) private otpRepository: Repository<OTP>,
    @InjectRepository(Users) private dataRepository: Repository<Users>,
    private readonly jwtService: JwtService
  ) { }

  async connectCollection(){
    // try {
      await mongoose.connect('mongodb://127.0.0.1:27017/fleetManagement');
    //   console.log('connection successful')
    //   return true;
    // }
    // catch (error) { throw new HttpException("Connection Disturbed", HttpStatus.SERVICE_UNAVAILABLE) }
  }

  async sendOtp(email: string) {

    const user = await this.dataRepository.findOne({ where: { email } })

        if (!user) {
        // user = this.dataRepository.create({
        //   email
        // })
        // this.dataRepository.save(user)
        console.log('Error! User does not exist')
        throw new HttpException("Invalid email id", HttpStatus.UNAUTHORIZED)
      }
      else {
        let loggedUser = await this.otpRepository.findOne({ where: { email } })
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        if (!loggedUser) {
          loggedUser = this.otpRepository.create({ email, otp })
        }
        else {
          loggedUser.attempts = loggedUser.attempts + 1;
          const now = new Date();
          if (loggedUser.attempts > 3 && ((Date.now() - loggedUser.updatedAt.getTime()) / 60000 < 5)) {
            console.log("Maximum limit reached")
            return { message: "Maximum limit reached" }
          }
          else {
            loggedUser.otp = otp;
            loggedUser.updatedAt = now;
          }
        }
        const nodemailer = require("nodemailer")
        const transporter = nodemailer.createTransport(nodeMailerConfig)
        const mailOptions = {
          from: 'nodemailer.otp.sender@gmail.com',
          to: email,
          subject: 'OTP for Login',
          text: `Your OTP for login is: ${otp}`,
        }
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) { return err; }
          else { return info; }
        }
        );
        console.log("Message sent!", otp, email);
        this.otpRepository.save(loggedUser);
      }

    // try {
    //   await mongoose.connect('mongodb://localhost:27017/fleetManagement');
    //   console.log('connection successful')
    // }
    // catch (error) { throw new HttpException("Connection Disturbed", HttpStatus.SERVICE_UNAVAILABLE) }

    // try {
    //   this.connectCollection;
    //   console.log("connection successful");
    //   let regUser = await this.onRegisterModel.findOne({ email }).exec() //mongodb

    //   if (!regUser) {
    //     console.log("user does not exist! creating new registration details")
    //     // await this.onRegisterModel.create({ email: email })
    //     throw new HttpException("Invalid email id", HttpStatus.UNAUTHORIZED)
    //   }
    //   else {
    //     let logUser = await this.onLoginModel.findOne({ email: email }).exec()
    //     const otp = Math.floor(1000 + Math.random() * 9000).toString();
    //     const nodemailer = require("nodemailer")
    //     const transporter = nodemailer.createTransport(nodeMailerConfig)
    //     const mailOptions = {
    //       from: 'nodemailer.otp.sender@gmail.com',
    //       to: email,
    //       subject: 'OTP for Login',
    //       text: `Your OTP for login is: ${otp}`,
    //     }
    //     transporter.sendMail(mailOptions, (err, info) => {
    //       if (err) { return err; }
    //       else { return info; }
    //     }
    //     );
    //     console.log("Message sent!", otp, email);
    //     if (!logUser) {
    //       const newLogUser = await this.onLoginModel.create({ email, otp });
    //       newLogUser.attempts = 1;
    //       newLogUser.save();
    //     }
    //     else {
    //       logUser.attempts = logUser.attempts + 1;
    //       const now = new Date();
    //       if (logUser.attempts > 3 && ((Date.now() - logUser.updatedAt.getTime()) / 60000 < 5)) {
    //         console.log("Maximum limit reached")
    //         return { message: "Maximum limit reached" }
    //       }
    //       else {
    //         logUser.updatedAt = now;
    //         logUser.otp = otp;
    //         logUser.save();
    //       }
    //     }
    //   }

    // }catch (error) { throw new HttpException("Connection Disturbed", HttpStatus.SERVICE_UNAVAILABLE) }
  }

  async verifyOtp(email: string, otp: string) {

    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/fleetManagement');
      console.log('connection successful')
    }
    catch (error) { throw new HttpException("Connection Disturbed", HttpStatus.SERVICE_UNAVAILABLE) }

    const user = await this.dataRepository.findOne({ where: { email } })

    const loggedUser = await this.otpRepository.findOne({ where: { email } })

    // let regUser = await this.onRegisterModel.findOne({ email }).exec()
    // console.log(regUser)

    // let logUser = await this.onLoginModel.findOne({ email: email }).exec()
    // console.log(logUser)

    // if (logUser && logUser.otp === otp) {
    //   logUser.isVerified = true;
    //   logUser.attempts = 0;
    //   logUser.save();
    //   console.log("logged in!")

    //   console.log(logUser.id)

    //   const payload = { sub: regUser.id };
    //   const token = await this.jwtService.signAsync(payload)
    //   console.log(token)
    //   return { token }
    // }

    if (loggedUser && loggedUser.otp === otp) {
      loggedUser.isVerified = true;
      loggedUser.attempts = 0;
      await this.otpRepository.save(loggedUser)
      console.log("logged in!", loggedUser);
      const payload = { sub: user.id };
      const token = await this.jwtService.signAsync(payload)
      console.log(token)
      return { token }
    }
    else { throw new HttpException("Invalid otp", HttpStatus.UNAUTHORIZED) }
  }

  getProfile(email: string) {
    return this.dataRepository.findOneBy({ email })
  }

  getRecord(email: string) { return this.otpRepository.findOneBy({ email }) }

  getRecords() { return this.otpRepository.find() }
}









// changed - localhost path of mongo