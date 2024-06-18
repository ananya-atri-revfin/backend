import {Strategy} from 'passport-local'
import {PassportStrategy} from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService){
        super();
    }

    async validate(email: string){
        const user = await this.authService.validateUser(email);
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}