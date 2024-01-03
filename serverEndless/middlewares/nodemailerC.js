import nodemailer from "nodemailer"

export const Transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'kamaldeep228@vibhuti.biz',
        pass: 'njnv uevf wqde bzpx',
    },
})