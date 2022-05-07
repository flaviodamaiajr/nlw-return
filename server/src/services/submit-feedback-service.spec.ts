import { SubmitFeedbackService } from "./submit-feedback-service"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackService = new SubmitFeedbackService(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe('Submit Feedback', () => {
    it('should be able to submit feedback', async () => {
        await expect(submitFeedbackService.handleSubmitFeedback({
            type: 'BUG',
            comment: 'Example comment',
            screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
    });

    it('should not be able to submit feedback without a type', async () => {
        await expect(submitFeedbackService.handleSubmitFeedback({
            type: '',
            comment: 'Example comment',
            screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg'
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback without a comment', async () => {
        await expect(submitFeedbackService.handleSubmitFeedback({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg'
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback with an invalid screenshot', async () => {
        await expect(submitFeedbackService.handleSubmitFeedback({
            type: 'BUG',
            comment: 'Example comment',
            screenshot: 'data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUg'
        })).rejects.toThrow();
    });
});