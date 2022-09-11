import { hash } from 'bcrypt';
import { PrismaClient } from '@prisma/client';

import { User } from '@users/models/User';
import { IUserRepository } from '@users/repositories/IUserRepository';

export { UserRepository };

class UserRepository implements IUserRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
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
