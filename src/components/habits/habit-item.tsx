"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Flame } from "lucide-react";

import type { Habit } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getHabitIcon } from "../app-layout";

type HabitItemProps = {
  habit: Habit;
};

export function HabitItem({ habit }: HabitItemProps) {
  const [isCompleted, setIsCompleted] = useState(habit.isCompletedToday);
  const Icon = getHabitIcon(habit.icon);
  const progress = (habit.goal.current / habit.goal.target) * 100;

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
        <div className="flex-1">
          <CardTitle className="text-lg">
            <Link href={`/habits/${habit.id}`} className="hover:underline">
              {habit.name}
            </Link>
          </CardTitle>
          <CardDescription className="flex items-center gap-1">
            <Flame className="h-4 w-4 text-orange-500" />
            {habit.streak} day streak
          </CardDescription>
        </div>
        <Button
          variant={isCompleted ? "default" : "outline"}
          size="icon"
          className="h-10 w-10 shrink-0 rounded-full"
          onClick={() => setIsCompleted(!isCompleted)}
          aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
        >
          <Check className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Goal Progress</span>
            <span>
              {habit.goal.current}/{habit.goal.target} {habit.goal.unit}
            </span>
          </div>
          <Progress value={progress} />
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          {habit.frequency === "daily"
            ? "Daily"
            : `Weekly on ${habit.days.join(", ")}`}
        </p>
      </CardFooter>
    </Card>
  );
}
