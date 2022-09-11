import { hash } from 'bcrypt';
import { PrismaClient } from '@prisma/client';

import { User } from '@users/models/User';
import {
  ICreateUserDTO,
  IUserRepository,
} from '@users/repositories/IUserRepository';

export { UserRepository };

class UserRepository implements IUserRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async create({ name, email, password }: ICreateUserDTO) {
    const password_hash = await hash(password, 10);

    const userOnDB = await this.prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    });

    const user = new User(userOnDB);

    return user;
  }

  async findByEmail(email: string) {
    const userFromDb = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    const user =
      userFromDb === null //
        ? null
        : new User(userFromDb);

    return user;
  }
}
