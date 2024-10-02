import { Request, RequestParamHandler, Response } from "express";
import { Get, Post } from "../../utils/decorators/Methods";
import config from "./../../api.config.json";
import { PrismaClient } from "@prisma/client";
import { error } from "console";
import {
    verifyUsername,
    verifyEmail,
    saveAccount,
    UserInfo,
} from "./functions/createAccount";
import { RetornoService } from "../../utils/RetornoService";
import { verifyLogin } from "./functions/login";

const prisma = new PrismaClient();

interface loginInfo {
    username: string;
    password: string;
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
        try {
            await verifyUsername(newAccount.username);
            await verifyEmail(newAccount.email);
            await saveAccount(newAccount);
            return "Account succesfully created!";
        } catch (error) {
            return error as Error;
        }
    }

    @Post("/api/login")
    async logIn(req: Request, res: Response) {
        const loginAccount: loginInfo = req.body;
        try {
            const isValid = await verifyLogin(loginAccount);
            if (isValid) {
                return "Logged in successfully";
            } else {
                throw new Error("Username or password are invalid!");
            }
        } catch (error) {
            return error as Error;
        }
    }
}
