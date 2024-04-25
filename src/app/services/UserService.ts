import { hash } from "bcryptjs";
import prismaClient from "../../prisma";
import { BadRequestError } from "../../utils/api-errors";

interface CreateUserProps {
    fullname: string;
    email: string;
    password: string;
    address: AddressProps;
}

class UserService {
    static async index(userId: string) {
        const user = await prismaClient.user.findFirst({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                fullname: true,
                address: {
                    select: {
                        zipCode: true,
                    },
                },
            },
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

    static async create(objectUser: CreateUserProps) {
        const findUser = await prismaClient.user.findFirst({
            where: { email: objectUser.email },
        });

        if (findUser) {
            throw new BadRequestError("E-mail já utilizado!");
        }

        const hashPassword = await hash(objectUser.password, 8);

        const user = await prismaClient.user.create({
            data: {
                ...objectUser,
                password: hashPassword,
                address: { create: objectUser.address },
            },
        });

        return {
            user,
            status: {
                code: 201,
                msg: "",
            },
        };
    }

    static async remove(userId: string) {
        const user = await prismaClient.user.delete({
            where: { id: userId },
        });

        return {
            user,
            status: {
                code: 204,
                msg: "",
            },
        };
    }
}

export default UserService;
