import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByName(username)
    const validPassword = await bcrypt.compare(pass, user.password)
    if (validPassword) {
      const { password, ...result } = user
      return result;
    }
    return null;
  }

  async login(body: any) {
    const {username, password} = body
    const user = await this.validateUser(username, password)
    if (user === null) {
      return false
    }

    const payload = user
    return {
      user,
      access_token: this.jwtService.sign(payload, {expiresIn: '2 days'}),
    };
  }
}
