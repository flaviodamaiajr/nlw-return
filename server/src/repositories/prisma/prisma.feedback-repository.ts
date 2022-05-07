import { prisma } from "../../prisma";
import { IFeedbackCrateData, IFeedbackRepository } from "../feedback-repository";

export class PrismaFeedBackRepository implements IFeedbackRepository {
    async create({ type, comment, screenshot }: IFeedbackCrateData) {
        await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot,
            }
        });
    };
}