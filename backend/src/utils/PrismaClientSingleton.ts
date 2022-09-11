import { PrismaClient } from '@prisma/client';

export { PrismaClientSingleton };

class PrismaClientSingleton {
  client: PrismaClient;
  private static INSTANCE: PrismaClientSingleton;

  private constructor() {
    this.client = new PrismaClient();
  }

  static getInstance() {
    this.INSTANCE = this.INSTANCE ?? new PrismaClientSingleton();
    return this.INSTANCE;
  }
}
