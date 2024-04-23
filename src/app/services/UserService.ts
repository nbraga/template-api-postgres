import { hash } from "bcryptjs";
import { UserRegisterProps } from "../../interfaces/userProps";
import prismaClient from "../../prisma";
import { BadRequestError } from "../../utils/api-errors";

class UserService {
    static async index() {
        return {
            users: [],
            status: {
                code: 200,
                msg: "",
            },
        };
    }

    static async refreshData(userId: string) {
        const user = await prismaClient.user.findFirst({
            where: { id: userId },
        });

        if (!user) {
            throw new BadRequestError("Usuário não existe!");
        }

        return {
            user,
            status: {
                code: 200,
                msg: "",
            },
        };
    }

    static async create(objectData: UserRegisterProps) {
        const hashPassword = await hash(objectData.password, 8);

        return {
            status: {
                code: 201,
                msg: "",
            },
        };
    }
}

export default UserService;
