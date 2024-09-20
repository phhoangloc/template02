
import type { NextApiRequest, NextApiResponse } from 'next'
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
import { PrismaClient } from '@prisma/client';
import { transporter } from '@/connect/mail';

const createUser = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const prisma = new PrismaClient();

    if (req.method === 'POST') {
        const body = req.body;
        const salt = bcrypt.genSaltSync(10);
        const mahoa_password = req.body.password && bcrypt.hashSync(req.body.password.toString(), salt);
        body.password = mahoa_password
        const result: any = { success: false }
        await prisma.user.create({ data: body })
            .catch((error: Error) => {
                result.success = false
                result.message = error.message
                throw error.message
            })

        const mainOptions = {
            from: 'astem (astem@gmail.com) <no-reply>',
            to: req.body.email,
            subject: 'Active your Account',
            html: `
        <p style="text-align:center">Thanks for register<p>
        <p style="text-align:center">To active the account click <a style="font-weight:bold;color:green" href="${process.env.HOMEPAGE_URL}api/active?email=${req.body.email}">here</a>!<p>`
        };
        await transporter.sendMail(mainOptions)
            .catch((error: Error) => {
                result.success = false
                result.message = error.message
                res.send(result)
                throw error.message
            }).then(() => {
                result.success = true
                result.message = "an email have been sent to your email. Check your email to active your account."
                res.json(result)
            })
    } else {
        res.json({
            success: false,
            message: "your request method is not supply"
        })
    }
}

export default createUser