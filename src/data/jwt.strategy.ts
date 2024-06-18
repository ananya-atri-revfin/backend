import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'abc123'
        })
    }

    // async validate(email: string, otp: string): Promise<any>{
    async validate(payload: any): Promise<any>{
        return {userId: payload.sub, username: payload.username}
        // const user = this.authService.validate(email, otp);
        // if(!user){
        //     throw new UnauthorizedException();
        // }
        // return user;
    }
}