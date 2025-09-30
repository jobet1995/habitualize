"use server";

/**
 * @fileOverview AI-powered habit importance suggestion flow.
 *
 * This file exports:
 * - `suggestImportantHabit`: A function that suggests the most important habit to complete first.
 * - `SuggestImportantHabitInput`: The input type for the suggestImportantHabit function.
 * - `SuggestImportantHabitOutput`: The return type for the suggestImportantHabit function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const SuggestImportantHabitInputSchema = z.object({
  habits: z
    .array(
      z.object({
        name: z.string().describe("The name of the habit."),
        streak: z.number().describe("The current streak for the habit."),
        successRate: z
          .number()
          .describe("The success rate of completing the habit."),
        goalProgress: z
          .number()
          .describe("The progress towards the goal for the habit."),
      }),
    )
    .describe("An array of habits with their associated metrics."),
});
export type SuggestImportantHabitInput = z.infer<
  typeof SuggestImportantHabitInputSchema
>;

const SuggestImportantHabitOutputSchema = z.object({
  suggestedHabit: z
    .string()
    .describe("The name of the habit suggested to complete first."),
  reason: z.string().describe("The AI reasoning for choosing the habit."),
});
export type SuggestImportantHabitOutput = z.infer<
  typeof SuggestImportantHabitOutputSchema
>;

export async function suggestImportantHabit(
  input: SuggestImportantHabitInput,
): Promise<SuggestImportantHabitOutput> {
  return suggestImportantHabitFlow(input);
}

const prompt = ai.definePrompt({
  name: "suggestImportantHabitPrompt",
  input: { schema: SuggestImportantHabitInputSchema },
  output: { schema: SuggestImportantHabitOutputSchema },
  prompt: `You are an AI assistant that analyzes a user's habits and suggests the most important one to complete first each day.

  Consider the following factors when determining importance:
  - Current streak: Prioritize habits with high streaks to maintain momentum.
  - Success rate: Prioritize habits with lower success rates to improve consistency.
  - Goal progress: Prioritize habits that are close to reaching their goals.

  Given the following habits and their metrics:

  {{#each habits}}
  - Habit: {{name}}, Streak: {{streak}}, Success Rate: {{successRate}}, Goal Progress: {{goalProgress}}
  {{/each}}

  Suggest the most important habit to complete first and explain your reasoning in a concise manner.
  Format your response as:
  Suggested Habit: [Habit Name]
  Reason: [Explanation]`,
});

const suggestImportantHabitFlow = ai.defineFlow(
  {
    name: "suggestImportantHabitFlow",
    inputSchema: SuggestImportantHabitInputSchema,
    outputSchema: SuggestImportantHabitOutputSchema,
  },
  async (input: SuggestImportantHabitInput) => {
    const { output } = await prompt(input);
    return output!;
  },
);
