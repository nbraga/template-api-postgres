import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

class AdminService {
    static async create() {
        const hashPassword = await hash("123123123", 8);

        const user = await prismaClient.user.create({
            data: {
                email: "admin@manuapp.com.br",
                fullname: "ManuApp",
                password: hashPassword,
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
}

export default AdminService;
