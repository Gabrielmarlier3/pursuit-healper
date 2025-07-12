import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/user.service';
import { JwtPayload } from './interface/JwtPayload.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(matricula: string, senha: string) {
    const user = await this.users.findByMatricula(matricula);
    if (user && (bcrypt.compare(senha, user.passwordHash))) return user;
    throw new UnauthorizedException('Credenciais inválidas');
  }

  async login(user: { id: string; vehicleType: string; role: string }) {
    const payload: JwtPayload = { sub: user.id, vt: user.vehicleType, role: user.role as any };
    return { access_token: this.jwt.sign(payload, { expiresIn: '8h' }) };
  }
}
