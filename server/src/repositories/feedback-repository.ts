export interface IFeedbackCrateData {
    type: string,
    comment: string,
    screenshot?: string
}

export interface IFeedbackRepository {
    create: (data: IFeedbackCrateData) => Promise<void>;
}