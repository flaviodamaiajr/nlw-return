import { IMailAdapter } from "../adapters/mail-adapter";
import { IFeedbackRepository } from "../repositories/feedback-repository"

interface SubmitFeedbackRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackService {
    constructor(
        private feedbackRepository: IFeedbackRepository,
        private mailAdapter: IMailAdapter,
    ) { }

    async handleSubmitFeedback(request: SubmitFeedbackRequest) {
        const { type, comment, screenshot } = request;

        if (!type) {
            throw new Error('Type is required.');
        }

        if (!comment) {
            throw new Error('Comment is required.');
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.');
        }

        await this.feedbackRepository.create({
            type,
            comment,
            screenshot,
        });

        await this.mailAdapter.sendMail({
            subject: `Novo Feedback - ${type}`,
            body: [`<div style="font-family: sans-serif; font-size:16px;">
        <p>Tipo do feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`
            ].join('\n'),

        });
    }
}