import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const login = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    const prisma = new PrismaClient();


    if (req.method === 'POST') {
        let result: any
        const body = req.body
        const username = body.username
        const password = body.password

        const usenameiExsited = await prisma.user.findUnique({ where: { username: username } })
        if (usenameiExsited == null) {

            result = {
                success: false,
                message: "account is not Existed",
            }

            res.json(result)

        } else {
            if (usenameiExsited.active === false) {

                result = {
                    success: false,
                    message: "account is not active",
                }

                res.json(result)

            } else {
                const isPasswordValid = await bcrypt.compare(password, usenameiExsited.password);
                if (isPasswordValid) {

                    const payload = { id: usenameiExsited.id }

                    const token = jwt.sign(payload, 'secretToken', { expiresIn: '24h' });

                    result = {
                        success: true,
                        message: "login successfull",
                        result: token,
                    }

                    res.json(result)


                } else {
                    result = {
                        success: false,
                        message: "password is not correct",
                    }

                    res.json(result)
                }
            }
        }
    } else {
        res.json({
            success: false,
            message: "your request method is not supply"
        })
    }


}


export default login