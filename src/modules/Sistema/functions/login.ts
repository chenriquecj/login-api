import { PrismaClient } from "@prisma/client";

interface loginInfo {
    username: string;
    password: string;
}

const prisma = new PrismaClient();

export async function verifyLogin(loginAccount: loginInfo) {
    const verifyLogin = await prisma.user_info.findFirst({
        where: {
            username: loginAccount.username,
        },
    });
    if (
        verifyLogin?.username == loginAccount.username &&
        verifyLogin?.password == loginAccount.password
    ) {
        return true;
    }
    return false
}