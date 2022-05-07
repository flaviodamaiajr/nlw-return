import nodemailer from 'nodemailer';
import { IMailAdapter, ISendMailData } from "../mail-adapter";


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "6735933d9d9015",
        pass: "335cbb2418df52"
    }
});

export class NodeMailerAdapter implements IMailAdapter {
    async sendMail({ subject, body }: ISendMailData) {
        await transport.sendMail({
            from: "Equipe Feedget <oi@feedget.com>",
            to: "Flávio <flaviodamaiajr@gmail.com>",
            subject,
            html: body
        })
    }
}