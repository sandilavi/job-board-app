import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("abcd", 10);
    
    await prisma.user.create({
        data: {
            email: "admin@example.com",
            password: hashedPassword,
            role: "admin"
        }
    });

    console.log("User created!");
}

main() 
    .catch(e => {
        throw e;
    })
    .finally(async() => {
        await prisma.$disconnect();
    });    
