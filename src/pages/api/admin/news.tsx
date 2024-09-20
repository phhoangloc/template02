import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const jwt = require('jsonwebtoken')

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const prisma = new PrismaClient();
    const query = req.query
    const method = req.method
    const body = req.body

    let result: any = { success: false };
    const authorization = req.headers['authorization']
    const token = authorization && authorization.split(" ")[1]
    const id = token && await jwt.verify(token, 'secretToken').id
    const user = await prisma.user.findFirst({ where: { id } })
    const position = user?.position

    const bodyCorrect = {
        id: body.id,
        name: body.name,
        slug: body.slug,
        hostId: id,
        content: body.content,
    }
    if (position === "admin") {
        switch (method) {
            case "GET":
                let news: any = await prisma.news.findMany({
                    where: {
                        archive: query.genre?.toString() ? query.genre?.toString() : undefined,
                        id: Number(query?.id) ? Number(query?.id) : undefined
                    },

                    skip: query.skip ? Number(query.skip) : undefined,
                    take: query.limit ? Number(query.limit) : undefined,
                    orderBy: {
                        createdAt: 'desc', // Sắp xếp từ cũ đến mới
                    },
                })
                if (news.length) {
                    result.success = true
                    result.data = news
                    res.json(result)
                } else {
                    result.success = false
                    res.json(result)
                }
                break
            case "POST":
                await prisma.news.create({ data: bodyCorrect })
                    .catch((error: Error) => {
                        result.message = error.message
                        res.json(result)
                    })
                    .then((data: any) => {
                        result.success = true
                        result.message = "your news is created successfull"
                        result.data = data
                        res.json(result)
                    })
                break
            case "PUT":
                await prisma.news.update({
                    where: { id: Number(query.id) },
                    data: bodyCorrect
                })
                    .catch((error: Error) => {
                        result.message = error.message
                        res.json(result)
                    })
                    .then((data: any) => {
                        result.success = true
                        result.message = "your news is updated successfull"
                        res.json(result)
                    })
                break
            case "DELETE":
                await prisma.news.delete({
                    where: { id: Number(query.id) },
                })
                    .catch((error: Error) => {
                        result.message = error.message
                        res.json(result)
                    })
                    .then((data: any) => {
                        result.success = true
                        result.message = "your news is deleted successfull"
                        res.json(result)
                    })
        }
    }
    else {
        res.send(result)
    }
}