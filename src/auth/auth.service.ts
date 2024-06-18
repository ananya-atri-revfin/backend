import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataService } from '../data/data.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly dataService: DataService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(
        email: string    
    )
    : Promise<{ token: string }> 
    {
        const user = await this.dataService.getRecord(email);
        if (user?.email !== email) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id };
        const token = await this.jwtService.signAsync(payload)
        console.log(token)
        return {
            token
            // access_token: await this.jwtService.signAsync(payload)
        }
    }
}