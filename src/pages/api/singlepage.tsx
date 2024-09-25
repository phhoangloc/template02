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


    const bodyCorrect = {
        id: body.id,
        name: body.name,
        slug: body.slug,
        content: body.content,
    }

    switch (method) {
        case "GET":
            let singlePage: any = await prisma.singlePage.findMany({
                where: {
                    archive: query.genre?.toString() ? query.genre?.toString() : undefined,
                    id: Number(query?.id) ? Number(query?.id) : undefined,
                    slug: query.slug?.toString() ? query.slug?.toString() : undefined,

                },
                skip: query.skip ? Number(query.skip) : undefined,
                take: query.limit ? Number(query.limit) : undefined,
                orderBy: {
                    createdAt: 'desc'
                },
            })
            result.success = true
            result.data = singlePage
            res.json(result)
            break
    }

}