import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService){

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'Zdej_tkoj_rabim_js_tu_sprement.Kr_smo_ze_leta_2020_mesec_01_dan_31'
        });

    }

    async validate(payload: JwtPayload){

        const user = await this.authService.validateUserByJwt(payload);

        if(!user){
            throw new UnauthorizedException();
        }

        return user;

    }

}