import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.usersRepository.create(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.query('select * from user where isDelete = 0');
  }

  async findOne(id: number): Promise<User | object> {
    const list = await this.usersRepository.query(
      `select * from user where isDelete = 0 and id = ${id}`,
    );
    if (list.length > 0) {
      return list[0];
    } else {
      return {};
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    await this.usersRepository.query(
      `update user set isDelete = 1 where id = ${id}`,
    );
  }
}
