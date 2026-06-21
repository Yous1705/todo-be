import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly repo: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateAuthDto) {
    const exist = await this.repo.findUserByEmail(dto.email);
    if (exist) throw new ConflictException('Email sudah digunakan');

    const hashed = await bcrypt.hash(dto.password, 10);

    const registerUser = await this.repo.create({
      ...dto,
      password: hashed,
    });

    return {
      success: true,
      message: `user ${registerUser.name} created successfully`,
      data: registerUser,
    };
  }

  async login(data: { email: string; password: string }) {
    const user = await this.repo.findUserByEmail(data.email);

    if (!user) throw new UnauthorizedException('Email belum terdaftar');

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) throw new UnauthorizedException('Password salah');

    const payload = {
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
