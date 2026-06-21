import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly repo: AuthRepository) {}

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
}
