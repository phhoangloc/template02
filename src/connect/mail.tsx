const nodemailer = require('nodemailer')
const { google } = require('googleapis');
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: "ph.hoangloc@gmail.com", // Email của bạn
        pass: "dyhg kybc wksh nary", // Mật khẩu hoặc mật khẩu ứng dụng
    },
});
