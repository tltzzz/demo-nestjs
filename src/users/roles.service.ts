import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Roles } from './roles.entity'

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private roles: Repository<Roles>,
  ) {}

  async findByName(name: string): Promise<Roles> {
    return this.roles.findOne({ where: { name } })
  }

  async findOne(id): Promise<Roles> {
    return this.roles.findOne(id, { relations: ['role'] })
  }

  findAll(): Promise<Roles[]> {
    return this.roles.find()
  }
}
