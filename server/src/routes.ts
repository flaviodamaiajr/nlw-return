import express from 'express';
import { NodeMailerAdapter } from './adapters/nodemailler/nodemailer-mail-adapter';
import { PrismaFeedBackRepository } from './repositories/prisma/prisma.feedback-repository';
import { SubmitFeedbackService } from './services/submit-feedback-service';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {

    const { type, comment, screenshot } = req.body;

    const prismaFeedBackRepository = new PrismaFeedBackRepository();
    const nodemailerMailAdapter = new NodeMailerAdapter();

    const submitFeedbackService = new SubmitFeedbackService(prismaFeedBackRepository, nodemailerMailAdapter);

    await submitFeedbackService.handleSubmitFeedback({ type, comment, screenshot });

    return res.status(201).send();
});