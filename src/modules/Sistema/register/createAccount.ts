import { PrismaClient } from "@prisma/client";
import { error } from "console";

export interface UserInfo {
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
    name: string;
    lastName: string;
}

const prisma = new PrismaClient();

export async function saveAccount(userInfo: UserInfo) {
    const createAccount = await prisma.user_info.create({
        data: {
            username: userInfo.username,
            password: userInfo.password,
            email: userInfo.email,
            phoneNumber: userInfo.phoneNumber,
            name: userInfo.name,
            lastName: userInfo.lastName,
            registerDate: new Date(),
            flagDeleted: false,
        },
    });
}

export async function verifyUsername(usernameToVerify: string){
    const isAvailable = await prisma.user_info.findFirst({
        where: {
            username: usernameToVerify
        }
    })
    if (isAvailable != null) {
        throw new Error("Username is not available")
    }
}

export async function verifyEmail(emailToVerify: string) {
    const isAvailable = await prisma.user_info.findFirst({
        where: {
            email: emailToVerify
        }
    })
    if (isAvailable != null) {
        throw new Error("Email address has already been registered")
    }
}