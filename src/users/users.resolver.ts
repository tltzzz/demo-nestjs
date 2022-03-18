import { UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { Users } from './users.entity'
import { Args, Query, Resolver, Int } from '@nestjs/graphql'
import { GqlAuthGuard } from '../auth/guards/gql.guard'

@Resolver()
export class UsersResolver {
  constructor(
    private usersService: UsersService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(returns => Users)
  async users(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }
}
