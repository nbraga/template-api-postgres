import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import prismaClient from "../../prisma";
import { ApiError } from "../../utils/api-errors";

class LoginService {
    static async create(email: string, password: string) {
        const user = await prismaClient.user.findFirst({
            where: { email },
        });

        if (!user) {
            throw new ApiError("E-mail ou senha incorreta!", 400);
        }

        const isMatchPassword = await compare(password, user.password);

        if (!isMatchPassword) {
            throw new ApiError("E-mail ou senha incorreta!", 400);
        }

        const token = sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        delete user.password;

        return {
            user,
            token,
            status: {
                code: 200,
                msg: "",
            },
        };
    }
}

export default LoginService;
