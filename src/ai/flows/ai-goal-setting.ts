"use server";

/**
 * @fileOverview This file contains the Genkit flow for AI-driven goal setting in a habit tracker app.
 *
 * - aiGoalSetting - A function that provides AI assistance in setting realistic and achievable goals for habits.
 * - AiGoalSettingInput - The input type for the aiGoalSetting function.
 * - AiGoalSettingOutput - The return type for the aiGoalSetting function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const AiGoalSettingInputSchema = z.object({
  habitName: z
    .string()
    .describe("The name of the habit for which to set a goal."),
  historicalData: z
    .string()
    .describe("Historical data and progress for the habit."),
  currentStreak: z.number().describe("The current streak for the habit."),
  successRate: z.number().describe("The success rate for the habit (0-100)."),
});
export type AiGoalSettingInput = z.infer<typeof AiGoalSettingInputSchema>;

const AiGoalSettingOutputSchema = z.object({
  suggestedGoal: z
    .string()
    .describe("An AI-suggested realistic and achievable goal for the habit."),
  reasoning: z
    .string()
    .describe("The AIs reasoning behind the suggested goal."),
});
export type AiGoalSettingOutput = z.infer<typeof AiGoalSettingOutputSchema>;

export async function aiGoalSetting(
  input: AiGoalSettingInput,
): Promise<AiGoalSettingOutput> {
  return aiGoalSettingFlow(input);
}

const prompt = ai.definePrompt({
  name: "aiGoalSettingPrompt",
  input: { schema: AiGoalSettingInputSchema },
  output: { schema: AiGoalSettingOutputSchema },
  prompt: `You are an AI assistant in a habit tracker application. Your task is to suggest a realistic and achievable goal for a given habit, taking into account the user's historical data and progress.

Habit Name: {{{habitName}}}
Historical Data: {{{historicalData}}}
Current Streak: {{{currentStreak}}}
Success Rate: {{{successRate}}}%

Based on this information, suggest a specific, measurable, achievable, relevant, and time-bound (SMART) goal for the user. Explain your reasoning for the suggested goal. The goal should motivate the user to continue improving their habit.

Output the suggested goal and reasoning in a structured format.
`,
});

const aiGoalSettingFlow = ai.defineFlow(
  {
    name: "aiGoalSettingFlow",
    inputSchema: AiGoalSettingInputSchema,
    outputSchema: AiGoalSettingOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  },
);
