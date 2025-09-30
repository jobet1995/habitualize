"use client";

import { useState } from "react";
import { Lightbulb, Loader2 } from "lucide-react";

import type { Habit } from "@/lib/types";
import { suggestImportantHabit } from "@/ai/flows/ai-habit-importance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type AiHabitSuggestionProps = {
  habits: Habit[];
};

type Suggestion = {
  suggestedHabit: string;
  reason: string;
};

export function AiHabitSuggestion({ habits }: AiHabitSuggestionProps) {
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetSuggestion = async () => {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const habitDataForAI = habits.map(
        ({ name, streak, successRate, goalProgress }) => ({
          name,
          streak,
          successRate,
          goalProgress,
        }),
      );
      const result = await suggestImportantHabit({ habits: habitDataForAI });
      setSuggestion(result);
    } catch (error) {
      console.error("AI suggestion failed:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get an AI suggestion. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-primary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          <span>AI Priority Suggestion</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          {!suggestion && !isLoading && (
            <p className="text-muted-foreground">
              Not sure where to start? Let AI suggest the most impactful habit
              to tackle first today.
            </p>
          )}
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Analyzing your habits...</span>
            </div>
          )}
          {suggestion && (
            <div>
              <p className="font-semibold text-lg">
                Focus on:{" "}
                <span className="text-primary">
                  {suggestion.suggestedHabit}
                </span>
              </p>
              <p className="text-muted-foreground">{suggestion.reason}</p>
            </div>
          )}
        </div>
        <Button onClick={handleGetSuggestion} disabled={isLoading}>
          {isLoading ? "Thinking..." : "Suggest a Habit"}
        </Button>
      </CardContent>
    </Card>
  );
}
