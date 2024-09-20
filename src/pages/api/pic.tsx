import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const jwt = require('jsonwebtoken')
const formidable = require('formidable');
const Client = require('ssh2-sftp-client');

export const config = {
    api: {
        bodyParser: false, // Tắt bodyParser để sử dụng formidable
    },
};

const image = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    const query = req.query
    const method = req.method
    const result: any = { success: false }
    const prisma = new PrismaClient();

    switch (method) {
        case "GET":
            const pics = await prisma.pic.findMany(
                {
                    where: {
                        archive: query.genre?.toString() ? query.genre?.toString() : undefined,
                        id: Number(query?.id) ? Number(query?.id) : undefined
                    },
                    skip: query.skip ? Number(query.skip) : undefined,
                    take: query.limit ? Number(query.limit) : undefined,
                }
            )
            if (pics.length) {
                result.success = true
                result.data = pics
                res.json(result)
            } else {
                result.success = false
                result.data = []
                res.json(result)
            }
            break
    }
}


export default image