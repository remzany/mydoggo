import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User} from './user.interface';
import { CreateUserDto, UpdateUserDto, UpdateTOdo } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  
    
  constructor(@InjectModel('User') private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto) {

    let createdUser = new this.userModel(createUserDto);
    return await createdUser.save();

  }

  async update(id: string, userDto: UpdateUserDto): Promise<User> {

    return await this.userModel.findByIdAndUpdate(id, userDto, {useFindAndModify: false, new: true});
  }

  async updateTodos(id: string, userTodo: UpdateTOdo): Promise<User> {

    return await this.userModel.findByIdAndUpdate(id, userTodo, {useFindAndModify: false, new: true});
  }

  async findOneByEmail(email): Model<User> {

    return await this.userModel.findOne({email: email});

  }

  async listUsers(): Promise<User[] | null> {
    return await this.userModel.find().exec();
  }
}
