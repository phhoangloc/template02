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
        coverId: body.coverId,
        hostId: id,
        content: body.content,
    }
    switch (method) {
        case "GET":
            let blog: any = await prisma.blog.findMany({
                where: {
                    archive: query.genre?.toString() ? query.genre?.toString() : undefined,
                    id: Number(query?.id) ? Number(query?.id) : undefined,
                    slug: query.slug?.toString() ? query.slug?.toString() : undefined,

                },
                include: {
                    cover: true
                },
                skip: query.skip ? Number(query.skip) : undefined,
                take: query.limit ? Number(query.limit) : undefined,
                orderBy: {
                    createdAt: 'desc', // Sắp xếp từ cũ đến mới
                },
            })
            if (blog.length) {
                result.success = true
                result.data = blog
                res.json(result)
            } else {
                result.success = false
                res.json(result)
            }
            break
    }
}