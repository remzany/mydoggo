import { Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService){

    }

    async validateUserByPassword(loginAttempt: LoginUserDto) {

        // This will be used for the initial login
        let userToAttempt = await this.usersService.findOneByEmail(loginAttempt.email);
        
        return new Promise((resolve) => {

            // Check the supplied password against the hash stored for this email address
            userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {
    
                if(err)      throw new UnauthorizedException({
                    status: HttpStatus.FORBIDDEN,
                    error: 'This is a custom message',
                  });
    
                if(isMatch){
                    // If there is a successful match, generate a JWT for the user
                    resolve(this.createJwtPayload(userToAttempt));
    
                } else {
                    throw new UnauthorizedException({
                        status: HttpStatus.FORBIDDEN,
                        error: 'This is a custom message',
                      });
                }
    
            });

        });

    }

    async validateUserByJwt(payload: JwtPayload) { 

        // This will be used when the user has already logged in and has a JWT
        let user = await this.usersService.findOneByEmail(payload.email);

        if(user){
            return this.createJwtPayload(user);
        } else {
            throw new UnauthorizedException({
                status: HttpStatus.FORBIDDEN,
                error: 'This is a custom message',
              });
        }

    }

    createJwtPayload(user: JwtPayload){

        let data: JwtPayload = {
            email: user.email,
            dogOwner: user.dogOwner,
            _id: user._id,
            dogName: user.dogName,
            dogBreed: user.dogBreed,
            userTodos: user.userTodos
        };

        let jwt = this.jwtService.sign(data);

        return {
            expiresIn: 60,
            dogOwner: user.dogOwner,
            token: jwt,
            _id: user._id,
            dogName: user.dogName,
            dogBreed: user.dogBreed,
            userTodos: user.userTodos
        }

    }

}