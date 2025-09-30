// This file is machine-generated - edit at your own risk!

"use server";

/**
 * @fileOverview This file defines a Genkit flow for providing AI-powered habit suggestions.
 *
 * The flow takes user's existing habits and goals as input and returns a list of personalized habit suggestions.
 * @param {AiHabitSuggestionInput} input - The input for the flow, including existing habits and goals.
 * @returns {Promise<AiHabitSuggestionOutput>} A promise that resolves with the AI-generated habit suggestions.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const AiHabitSuggestionInputSchema = z.object({
  existingHabits: z
    .array(z.string())
    .describe("A list of the user's current habits."),
  goals: z
    .string()
    .describe("A description of the user's goals and aspirations."),
});

export type AiHabitSuggestionInput = z.infer<
  typeof AiHabitSuggestionInputSchema
>;

const AiHabitSuggestionOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe("A list of AI-generated habit suggestions."),
});

export type AiHabitSuggestionOutput = z.infer<
  typeof AiHabitSuggestionOutputSchema
>;

export async function getAiHabitSuggestions(
  input: AiHabitSuggestionInput,
): Promise<AiHabitSuggestionOutput> {
  return aiHabitSuggestionFlow(input);
}

const aiHabitSuggestionPrompt = ai.definePrompt({
  name: "aiHabitSuggestionPrompt",
  input: { schema: AiHabitSuggestionInputSchema },
  output: { schema: AiHabitSuggestionOutputSchema },
  prompt: `You are an AI habit suggestion assistant. You will suggest habits to the user based on their existing habits and goals.

Existing Habits: {{{existingHabits}}}
Goals: {{{goals}}}

Suggest some habits that would help the user achieve their goals, taking into account their existing habits.
Format your response as a list of habits.`,
});

const aiHabitSuggestionFlow = ai.defineFlow(
  {
    name: "aiHabitSuggestionFlow",
    inputSchema: AiHabitSuggestionInputSchema,
    outputSchema: AiHabitSuggestionOutputSchema,
  },
  async (input: AiHabitSuggestionInput) => {
    const { output } = await aiHabitSuggestionPrompt(input);
    return output!;
  },
);
