import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from '@prisma/client';



const Active =
    async (
        req: NextApiRequest,
        res: NextApiResponse
    ) => {
        const query = req.query
        const email: any = query.email
        let result: any
        const prisma = new PrismaClient();
        const user = await prisma.user.findFirst({ where: { email } })
        if (user?.id) {
            await prisma.user.update({ where: { id: user.id }, data: { active: true } })
                .catch((error: Error) => {
                    res.json(result)
                    throw error.message
                })
                .then((data: any) => {
                    res.json("your account is active successfull")
                })
        } else {
            res.json("your account has a fault")
        }
    }

export default Active