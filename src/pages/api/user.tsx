import type { NextApiRequest, NextApiResponse } from 'next'
// import connectMongoDB from '@/connect/database/mogoseDB'
// import { userModel } from '@/model/user.model'

const jwt = require('jsonwebtoken')
import { PrismaClient } from '@prisma/client';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const prisma = new PrismaClient();
    // connectMongoDB()
    let id
    let result: any = { success: false };
    const authorization = req.headers['authorization']
    const token = authorization && authorization.split(" ")[1]

    if (token) {
        try {
            await jwt.verify(token, 'secretToken', async (err: Error, data: any) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        result.message = ''
                        res.json(result);
                    } else {
                        res.json(result);
                    }
                } else {
                    id = data.id
                    const user = await prisma.user.findUnique({
                        where: {
                            id: id
                        },
                        include: {
                            // id: true,
                            // username: true,
                            // email: true,
                            cover: {
                                select: {
                                    name: true
                                }
                            },
                            avata: {
                                select: {
                                    name: true
                                }
                            }

                            // position: true,
                        }
                        // select: {
                        // pic: {
                        //     select: {
                        //         id: true,
                        //         name: true,
                        //     },
                        // }
                        // }
                    })
                    if (user?.id) {
                        const { password, ...userwithoutpassword } = user
                        result.success = true
                        result.data = userwithoutpassword
                        res.json(result)
                    } else {
                        result.success = false
                        result.data = []
                        res.json(result)
                    }

                }
            })
        } catch (error) {
            result.success = false
            res.json(result)
        }
    } else {
        res.send(result)
    }
}