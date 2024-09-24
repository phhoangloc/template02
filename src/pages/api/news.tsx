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

    let result: any = { success: false };




    switch (method) {
        case "GET":
            let news: any = await prisma.news.findMany({
                where: {
                    archive: query.genre?.toString() ? query.genre?.toString() : undefined,
                    id: Number(query?.id) ? Number(query?.id) : undefined,
                    slug: query.slug?.toString() ? query.slug?.toString() : undefined,

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
    }
}