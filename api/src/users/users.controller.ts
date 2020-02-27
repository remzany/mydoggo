
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UpdateTOdo } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/users')
export class UsersController {

    constructor(private usersService: UsersService) {

    }

    @Post() 
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }

    @Post('updateUser') 
    async update(@Body() updateUser: UpdateUserDto) {
        return await this.usersService.update(updateUser.uid, updateUser);
    }

    @Post('updateUserTodos')
    async updateTodos(@Body() userTodos: UpdateTOdo) {
        return await this.usersService.updateTodos(userTodos.uid, userTodos);
    }

    // This route will require successfully passing our default auth strategy (JWT) in order
    // to access the route
    @Get('test')
    async testAuthRoute(){
        return await {
            message: "this shit works"
        }
    }

    @Get('getlist')
    async getUsers(){
        return await {
            message: await this.usersService.listUsers()
        }
    }
}