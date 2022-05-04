import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenShootButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequest: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequest,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");

  function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();
    console.log(comment, screenshot);
    onFeedbackSent();
  }

  const feedbackTypeInfo = feedbackTypes[feedbackType];
  return (
    <>
      <header>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartRequest}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
        <span className="text-lx leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form
        className="my-4 w-full"
        onSubmit={(event) => handleSubmitFeedback(event)}
      >
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Algo não está funcionando bem?&#10;Queremos corrigir. Conte com detalhes o que está acontecendo..."
          onChange={(event) => setComment(event.target.value)}
        />
        <footer className="flex gap-2 mt-2">
          <ScreenshotButton onSuccess={setScreenshot} screenshot={screenshot} />
          <button
            type="submit"
            className="p-2 bg-brand-500 font-medium rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
            disabled={comment.length === 0}
          >
            Enviar Feedback
          </button>
        </footer>
      </form>
    </>
  );
}
