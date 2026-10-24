import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { askAi } from "../api/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { reviewFormSchema, type ReviewFormValues } from "../schemas/reviewSchema";
import type { AiReview } from "../types";

const readinessConfig: Record<
  AiReview["readiness"],
  { label: string; badgeClass: string; icon: string }
> = {
  ready: {
    label: "Ready",
    icon: "✓",
    badgeClass:
      "border-emerald-300 bg-emerald-100 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300",
  },
  almost: {
    label: "Almost ready",
    icon: "◐",
    badgeClass:
      "border-amber-300 bg-amber-100 text-amber-800 dark:border-amber-800 dark:bg-amber-950/70 dark:text-amber-300",
  },
  "not-yet": {
    label: "Not yet ready",
    icon: "✕",
    badgeClass:
      "border-rose-300 bg-rose-100 text-rose-800 dark:border-rose-800 dark:bg-rose-950/70 dark:text-rose-300",
  },
};

const defaultPlaceholder =
  "Describe your Campus Lost & Found project implementation: e.g. purpose, authentication, reporting items, status lifecycle (LOST, FOUND, CLAIMED), and verification steps...";

function ReviewPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    mode: "onBlur",
    defaultValues: {
      prompt: "",
    },
  });

  const promptValue = watch("prompt") ?? "";
  const charCount = promptValue.trim().length;

  const reviewMutation = useMutation<AiReview, Error, ReviewFormValues>({
    mutationFn: async (values: ReviewFormValues) => {
      return askAi(values.prompt.trim());
    },
  });

  const onSubmit = (values: ReviewFormValues) => {
    reviewMutation.mutate(values);
  };

  const review = reviewMutation.data;
  const isPending = reviewMutation.isPending;

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 py-2">
      <div className="flex flex-col gap-2 rounded-2xl border border-stone-300 bg-stone-100 p-6 shadow-md transition-colors duration-300 ease-in-out dark:border-stone-800 dark:bg-stone-900 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-teal-600/30 bg-teal-100/70 text-xl text-teal-700 dark:border-teal-400/30 dark:bg-teal-950/70 dark:text-teal-400">
            🤖
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-800 transition-colors duration-300 ease-in-out dark:text-orange-50">
              AI Review
            </h1>
            <p className="text-xs text-stone-500 transition-colors duration-300 ease-in-out dark:text-stone-400">
              Get automated architectural and readiness feedback on your Campus Lost &amp; Found System implementation.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5 text-left">
            <div className="flex items-center justify-between">
              <Label htmlFor="prompt" className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Project Description
              </Label>
              <span
                className={`text-xs ${
                  charCount > 2000
                    ? "font-semibold text-rose-600 dark:text-rose-400"
                    : charCount < 20 && charCount > 0
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-stone-500 dark:text-stone-400"
                }`}
              >
                {charCount} / 2,000 characters
              </span>
            </div>

            <textarea
              id="prompt"
              rows={6}
              placeholder={defaultPlaceholder}
              disabled={isPending}
              aria-invalid={errors.prompt ? true : undefined}
              {...register("prompt")}
              className="w-full rounded-xl border border-stone-300 bg-orange-50/50 p-4 text-sm leading-relaxed text-stone-800 placeholder:text-stone-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/30 disabled:opacity-60 dark:border-stone-800 dark:bg-stone-950 dark:text-orange-50 dark:placeholder:text-stone-600 dark:focus:border-teal-400 dark:focus:ring-teal-400/30"
            />

            {errors.prompt && (
              <p className="text-xs font-medium text-rose-600 dark:text-rose-400">
                {errors.prompt.message}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Minimum 20 characters required. Maximum 2,000 characters.
            </p>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-teal-600 text-xs font-semibold text-white hover:bg-teal-700 disabled:opacity-60 dark:bg-teal-700 dark:hover:bg-teal-600 sm:w-auto"
            >
              {isPending ? "Analyzing with AI…" : "Review my project"}
            </Button>
          </div>
        </form>
      </div>

      {isPending && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-stone-300 bg-stone-100 p-8 text-center shadow-md animate-pulse dark:border-stone-800 dark:bg-stone-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100/70 text-2xl text-teal-700 dark:bg-teal-950/70 dark:text-teal-400">
            ⏳
          </div>
          <h2 className="text-base font-semibold text-stone-800 dark:text-orange-50">
            Reviewing your project with Gemini AI…
          </h2>
          <p className="max-w-md text-xs text-stone-500 dark:text-stone-400">
            Evaluating your architecture, authentication, domain modeling, and readiness. This typically takes a few seconds.
          </p>
        </div>
      )}

      {reviewMutation.isError && (
        <div className="rounded-2xl border border-rose-300 bg-rose-100 p-6 text-left shadow-md transition-colors duration-300 ease-in-out dark:border-rose-800 dark:bg-rose-950/60">
          <div className="flex items-center gap-2">
            <span className="text-base">⚠️</span>
            <h2 className="text-sm font-bold text-rose-700 dark:text-rose-400">
              Review Failed
            </h2>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-stone-700 dark:text-stone-300">
            {reviewMutation.error.message || "An unexpected error occurred while contacting the AI review service."}
          </p>
        </div>
      )}

      {review && !isPending && (
        <article className="flex flex-col gap-6 rounded-2xl border border-stone-300 bg-stone-100 p-6 shadow-xl transition-colors duration-300 ease-in-out dark:border-stone-800 dark:bg-stone-900 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-stone-300 pb-5 dark:border-stone-800 sm:flex-row sm:items-center">
            <div>
              <span className="text-xs font-mono tracking-wider text-teal-600 uppercase dark:text-teal-400">
                Evaluation Report
              </span>
              <h2 className="mt-1 text-xl font-bold text-stone-800 dark:text-orange-50">
                Project Review Results
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
                Readiness:
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${
                  readinessConfig[review.readiness].badgeClass
                }`}
              >
                <span>{readinessConfig[review.readiness].icon}</span>
                <span>{readinessConfig[review.readiness].label}</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold tracking-wider text-stone-500 uppercase dark:text-stone-400">
              Executive Summary
            </h3>
            <div className="rounded-xl border border-stone-200 bg-orange-50/60 p-4 text-sm leading-relaxed text-stone-700 dark:border-stone-800 dark:bg-stone-950/60 dark:text-stone-300">
              {review.summary}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 dark:border-emerald-900/60 dark:bg-emerald-950/20">
              <div className="flex items-center gap-2">
                <span className="text-base text-emerald-600 dark:text-emerald-400">✓</span>
                <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                  Key Strengths
                </h3>
              </div>
              <ul className="flex flex-col gap-2 text-xs leading-relaxed text-stone-700 dark:text-stone-300">
                {review.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">•</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50/50 p-5 dark:border-amber-900/60 dark:bg-amber-950/20">
              <div className="flex items-center gap-2">
                <span className="text-base text-amber-600 dark:text-amber-400">💡</span>
                <h3 className="text-sm font-bold text-amber-800 dark:text-amber-300">
                  Suggested Improvements
                </h3>
              </div>
              <ul className="flex flex-col gap-2 text-xs leading-relaxed text-stone-700 dark:text-stone-300">
                {review.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1 text-xs font-bold text-amber-600 dark:text-amber-400">•</span>
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}

export default ReviewPage;
