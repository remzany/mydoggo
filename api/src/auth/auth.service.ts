import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService){ }

    async validateUserByPassword(loginAttempt: LoginUserDto): Promise<any> {
        let userToAttempt: any = await this.usersService.findOneByEmail(loginAttempt.email);

        return new Promise((resolve) => {
            if (!userToAttempt) {
                resolve({success: false, msg: 'usernone'});
            }
            userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {
                if(err) resolve({success: false, msg: 'usererror'});
    
                if(isMatch){
                    resolve({success: true, data: this.createJwtPayload(userToAttempt)});
                } else {
                    resolve({success: false, msg: 'userwrong'})
                }
            });
        });
    }

    createJwtPayload(user){
        let data: JwtPayload = {
            id: user._id,
            email: user.email
        };

        let jwt = this.jwtService.sign(data);

        return {
            exp: 36000,
            token: jwt            
        }
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.usersService.getUser(payload.id);
    }
}