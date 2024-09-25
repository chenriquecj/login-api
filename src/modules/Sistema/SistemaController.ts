import { Request, Response } from "express";
import { Get, Post } from "../../utils/decorators/Methods";
import config from "./../../api.config.json";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient();

export interface UserInfo {
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
    name: string;
    lastName: string;
}

export class SistemaController {
    @Get("/sistema/versao")
    verificaVersao() {
        return {
            versao: config.versaoApp.versao,
            flagObrigatorio: config.versaoApp.flagObrigatorio,
        };
    }

    @Post("/api/register")
    async createAccount(req: Request, res: Response) {
        const newAccount: UserInfo = req.body;
        const now = new Date();
        now.setMilliseconds(0);
        try {
            const createAccount = await prisma.user_info.create({
                data: {
                    username: newAccount.username,
                    password: newAccount.password,
                    email: newAccount.email,
                    phoneNumber: newAccount.phoneNumber,
                    name: newAccount.name,
                    lastName: newAccount.lastName,
                    registerDate: now,
                    flagDeleted: false,
                },
            });

            console.log("Account registered");
        } catch (error) {
            console.log("Erro ao criar conta:", error);
        }
    }
}
