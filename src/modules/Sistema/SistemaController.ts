import { Request, Response } from "express";
import { Get, Post } from "../../utils/decorators/Methods";
import config from "./../../api.config.json";
import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { verifyUsername, verifyEmail, saveAccount, UserInfo } from "./register/createAccount";
import { RetornoService } from "../../utils/RetornoService";

const prisma = new PrismaClient();

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
        try {
            await verifyUsername(newAccount.username);
            await verifyEmail(newAccount.email);
            await saveAccount(newAccount);
            return 'Account succesfully created!';
        } catch (error) {
            return error as Error;
        }
    }
}
