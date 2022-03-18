import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Users } from './users.entity'
import { Roles } from './roles.entity'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './create-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private users: Repository<Users>,
    @InjectRepository(Roles) private roles: Repository<Roles>
  ) {}

  async findByName(name: string): Promise<Users> {
    return this.users.findOne({ where: { name } })
  }

  async findOne(id): Promise<Users> {
    return this.users.findOne(id, { relations: ['role'] })
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)
    return hash
  }

  async patchCreate(user: CreateUserDto) {
    user.password = await this.hashPassword(user.password)
    return user
  }

  async create(user: CreateUserDto): Promise<Users> {
    return await this.users.save(await this.patchCreate(user))
  }

  findAll(): Promise<Users[]> {
    return this.users.find()
  }
}
