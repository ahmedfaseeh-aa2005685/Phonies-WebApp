import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class UsersRepo {
  async updateCustomerBalance(customerId, amount) {
    return await prisma.customer.update({
      where: { id: customerId },
      data: { money: { decrement: amount } },
    });
  }

  async updateSellerBalance(sellerId, amount) {
    return await prisma.seller.update({
      where: { id: sellerId },
      data: { bankAccount: { increment: amount } },
    });
  }

  async addTransactionToCustomer(customerId, transaction) {
    return await prisma.customer.update({
      where: { id: customerId },
      data: { transactions: { push: transaction } },
    });
  }

  async getCustomers() {
    return await prisma.customer.findMany();
  }
  async getAdmins() {
    return await prisma.admin.findMany();
  }
  async getSellers() {
    return await prisma.seller.findMany();
  }

  async getAllUsers() {
    const allUsers = [];
    const customers = await getCustomers(prisma);
    const sellers = await getSellers(prisma);
    const admins = await getAdmins(prisma);

    // Concatenate all users into one array
    return [...customers, ...sellers, ...admins];
  }

  async addUser(userData, userType) {
    switch (userType) {
      case "seller":
        return await prisma.seller.create({ data: userData });
      case "customer":
        return await prisma.customer.create({ data: userData });
      case "admin":
        return await prisma.admin.create({ data: userData });
      default:
        throw new Error("Invalid user type");
    }
  }
  async addSeller(seller) {
    await prisma.seller.create({
      data: {
        username: seller.username,
        password: seller.password,
        companyName: seller.companyName,
        bankAccount: seller.bankAccount,
      },
    });
  }
  async addCustomer(customer) {
    await prisma.customer.create({
      data: {
        username: customer.username,
        password: customer.password,
        surname: customer.surname,
        money: customer.money,
        address: customer.address,
      },
    });
  }
  async addAdmin(admin) {
    await prisma.admin.create({
      data: {
        username: admin.username,
        password: admin.password,
      },
    });
  }

  async updateUser(id, updatedData, userType) {
    switch (userType) {
      case "seller":
        return await prisma.seller.update({ where: { id }, data: updatedData });
      case "customer":
        return await prisma.customer.update({
          where: { id },
          data: updatedData,
        });
      case "admin":
        return await prisma.admin.update({ where: { id }, data: updatedData });
      default:
        throw new Error("Invalid user type");
    }
  }

  async deleteUser(id, userType) {
    switch (userType) {
      case "seller":
        return await prisma.seller.delete({ where: { id } });
      case "customer":
        return await prisma.customer.delete({ where: { id } });
      case "admin":
        return await prisma.admin.delete({ where: { id } });
      default:
        throw new Error("Invalid user type");
    }
  }

  async getUserById(id, userType) {
    switch (userType) {
      case "seller":
        return await prisma.seller.findUnique({ where: { id } });
      case "customer":
        return await prisma.customer.findUnique({ where: { id } });
      case "admin":
        return await prisma.admin.findUnique({ where: { id } });
      default:
        throw new Error("Invalid user type");
    }
  }
}

export default new UsersRepo();

export async function getCustomers() {
  return await prisma.customer.findMany();
}
export async function getSellers() {
  return await prisma.seller.findMany();
}
export async function getAdmins() {
  return await prisma.admin.findMany();
}
