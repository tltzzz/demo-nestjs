import { Controller, Get, Post, Res, HttpStatus, Body, UseGuards, Param, Query, Request, Patch, Delete } from '@nestjs/common'
import { Response } from 'express'
import { UsersService } from './users.service'
import { CreateUserDto } from './create-user.dto'
import { CoreBaseEntityController } from '../core.baseEntityController'
import { Users } from './users.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { Roles } from '../auth/roles.decorator'
import { Role } from '../auth/role.enum'
import { RolesGuard } from 'src/auth/guards/roles.guard'

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController extends CoreBaseEntityController<Users, CreateUserDto, CreateUserDto> {

  constructor(
    @InjectRepository(Users) protected _entity: Repository<Users> ,
    private readonly usersService: UsersService   
  ) { super() }

  @Get('search')
  @Roles(Role.Employee, Role.HR, Role.Director)  
  async search(@Query() query, @Res() res: Response) {
    return super.search(query, res) 
  }
  
  @Get(':id')
  @Roles(Role.Employee, Role.HR, Role.Director)
  async get(@Request() req, @Res() res: Response, @Param() params) {
    const data = await this._entity.findOne(params.id)
    return res.status(HttpStatus.OK).json({data})    
  }


  @Post('')
  @Roles(Role.HR, Role.Director)
  async create(@Res() res: Response, @Body() body: CreateUserDto) {
    const data = await this.usersService.create(body)

    return res.status(HttpStatus.OK).json({data})
  }

  @Patch(':id')
  @Roles(Role.HR, Role.Director)
  async update(@Res() res: Response, @Body() body: CreateUserDto, @Param() params) {
    return super.update(res, body, params)
  }

  @Delete(':id')
  @Roles(Role.Director)
  async delete(@Res() res: Response, @Param() params) {
    return super.delete(res, params)   
  }

}
