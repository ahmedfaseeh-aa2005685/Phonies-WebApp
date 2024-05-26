//import fs from 'fs-extra'
//import path from 'path'
//import { PrismaClient } from '@prisma/client'
//
//const prisma = new PrismaClient();
//
//// Define paths to JSON data files
//const adminsPath = path.join(process.cwd(),"repos/storage/admins.json")
//const customersPath = path.join(process.cwd(),"repos/storage/customers.json")
//const sellersPath =path.join(process.cwd(),"repos/storage/sellers.json")
//const phonesPath = path.join(process.cwd(),"repos/storage/phones.json")
//    // const ownersPath = path.join(process.cwd(), 'app/data/owners.json')
//    // const accountsPath = path.join(process.cwd(), 'app/data/accounts.json')
//    // const transPath = path.join(process.cwd(), 'app/data/transactions.json')
//async function main() {
//    try {
//        // Read JSON files using fs-extra
//        const admins = await fs.readJSON(adminsPath);
//        const customers = await fs.readJSON(customersPath);
//        const sellers = await fs.readJSON(sellersPath);
//        const phones = await fs.readJSON(phonesPath);
//
//        // Sequentially create entries in the database for admins
//        console.log('Seeding admins...');
//        for (const admin of admins) {
//            await prisma.admin.create({ data: admin });
//        }
//        console.log('Admins seeded successfully.');
//
//        // Sequentially create entries in the database for customers
//        console.log('Seeding customers...');
//        for (const customer of customers) {
//            await prisma.customer.create({ data: customer });
//        }
//        console.log('Customers seeded successfully.');
//
//        // Sequentially create entries in the database for sellers
//        console.log('Seeding sellers...');
//        for (const seller of sellers) {
//            await prisma.seller.create({ data: seller });
//        }
//        console.log('Sellers seeded successfully.');
//
//        // Sequentially create entries in the database for phones
//        console.log('Seeding phones...');
//        for (const phone of phones) {
//            await prisma.phone.create({ data: phone });
//        }
//        console.log('Phones seeded successfully.');
//
//    } catch (error) {
//        console.error('Error during seeding:', error.message);
//        process.exit(1);  // Exit process with error
//    } finally {
//        await prisma.$disconnect();  // Always disconnect from the database
//    }
//}
//
//// Execute the main function
//main();
//