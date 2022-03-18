import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from './users.entity'
import { Roles } from './roles.entity'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Roles])
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver,
  ],
  exports: [TypeOrmModule, UsersService]
})
export class UsersModule {
  
}
