import { PrismaClient } from "@prisma/client";
import { User, NewUser } from "../types/User";

class UserStorage {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUserById(userId: number): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id: userId } });
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { username } });
  }

  async getUserByWallet(wallet: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { wallet } });
  }

  async createUser(user: NewUser): Promise<NewUser> {
    return await this.prisma.user.create({ data: user });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async getUserByIdentifier(identifier: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        OR: [
          { username: identifier },
          { wallet: identifier },
          { email: identifier },
        ],
      },
    });
  }

  async updateUserBalance(userId: number, newBalance: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { balance: newBalance }
    });
  }

}

export const userStorage = new UserStorage();
