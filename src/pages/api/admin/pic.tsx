import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import moment from 'moment';
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

    const authorization = req.headers['authorization']
    const token = authorization && authorization.split(" ")[1]
    const id = token && await jwt.verify(token, 'secretToken').id

    const user = await prisma.user.findFirst({ where: { id: id } })
    const position = user?.position
    const today = new Date();
    if (position === "admin") {
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
            case "POST":
                const form = new formidable.IncomingForm();
                await form.parse(req, async (err: Error, fields: any, files: any) => {
                    if (err) {
                        throw err
                    } else {
                        const uploadFile = files && files.file;
                        const client = new Client();
                        // client.ftp.timeout = 60 * 1000
                        await client.connect({
                            host: "162.43.88.28",
                            user: "locpham",
                            password: "031090Ph@",
                            port: 22
                        })
                            .then(async () => {
                                await client.put(uploadFile[0].filepath, `/home/locpham/public_html/template2/${moment(today).format("YYYY_MM_DD_hh_mm_ss") + "_" + uploadFile[0].originalFilename}`);
                                client.end()
                                const file = await prisma.pic.create({ data: { hostId: id, name: moment(today).format("YYYY_MM_DD_hh_mm_ss") + "_" + uploadFile[0].originalFilename } })
                                res.json(file)
                            });
                    }
                })
                break
            case "DELETE":
                const pic = await prisma.pic.findUnique({ where: { id: Number(query.id) } })
                if (id === pic?.hostId) {
                    const client = new Client();
                    await client.connect({
                        host: "162.43.88.28",
                        user: "locpham",
                        password: "031090Ph@",
                        secure: true
                    }).then(async () => {
                        const result = await client.delete("/home/locpham/public_html/template2/" + pic?.name);
                        if (result) {
                            await prisma.pic.delete({ where: { id: Number(query.id) } })
                            res.json({ success: true })
                        } else {
                            res.json({ success: false })
                        }
                        client.end()
                    })
                    break;
                } else {
                    res.json({
                        msg: "this pic is not yours",
                        success: false
                    })

                }
        }
    } else {
        res.json({
            msg: "you are not admin",
            success: false
        })
    }
}


export default image