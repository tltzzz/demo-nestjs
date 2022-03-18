import { UseGuards, Get, Res, HttpStatus, Param, Post, Body, Patch, Delete, Query, Request } from '@nestjs/common'
import { Response } from 'express'
import { Repository, DeepPartial } from 'typeorm'
import { CoreBaseController } from './core.baseController'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'

export class CoreBaseEntityController<Entity, DtoCreate, DtoUpdate> extends CoreBaseController {
  protected _entity: Repository<Entity>
  protected _defaultTake: number = 10

  private getSkip(page: number, take: number) {
    let skip = 0
    if (page > 1) {
      skip = take * (page - 1)
    }
    return skip
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  async search(@Query() query, @Res() res: Response) {
    let page = 1
    let take = this._defaultTake
    if (query.hasOwnProperty('take')) {
      take = query.take
    }
    if (query.hasOwnProperty('page')) {
      page = query.page
    }
    const skip = this.getSkip(page, take)
    const select = this._entity.createQueryBuilder().skip(skip).take(take);
    const data = await select.getManyAndCount()
    return res.status(HttpStatus.OK).json({data})    
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Request() req, @Res() res: Response, @Param() params) {
    const data = await this._entity.findOne(params.id)
    return res.status(HttpStatus.OK).json({data})    
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async create(@Res() res: Response, @Body() body: DeepPartial<Entity>) {
    const data = await this._entity.save(body)
    return res.status(HttpStatus.OK).json({data})
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Res() res: Response, @Body() body: DtoUpdate, @Param() params) {
    await this._entity.update(params.id, body)
    const data = await this._entity.findOne(params.id)
    return res.status(HttpStatus.OK).json({data})    
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Res() res: Response, @Param() params) {
    await this._entity.delete(params.id)
    return res.status(HttpStatus.OK).json({})    
  }
}
