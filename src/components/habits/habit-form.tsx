"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Book,
  Calendar,
  Dumbbell,
  Wind,
  Zap,
  Clock,
  Lightbulb,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Habit } from "@/lib/types";
import { aiGoalSetting } from "@/ai/flows/ai-goal-setting";
import React from "react";
import { useToast } from "@/hooks/use-toast";

const habitIcons = [
  { name: "Read", icon: "book", component: Book },
  { name: "Exercise", icon: "dumbbell", component: Dumbbell },
  { name: "Meditate", icon: "wind", component: Wind },
  { name: "Energy", icon: "zap", component: Zap },
  { name: "General", icon: "calendar", component: Calendar },
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Habit name must be at least 2 characters.",
  }),
  icon: z.string().min(1, { message: "Please select an icon." }),
  frequency: z.enum(["daily", "weekly"]),
  reminder: z.string().optional(),
  goal: z.string().optional(),
});

type HabitFormProps = {
  habit?: Habit;
};

export function HabitForm({ habit }: HabitFormProps) {
  const [isAiLoading, setIsAiLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: habit?.name ?? "",
      icon: habit?.icon ?? "",
      frequency: habit?.frequency ?? "daily",
      reminder: "",
      goal: habit?.goal ? `${habit.goal.target} ${habit.goal.unit}` : "",
    },
  });

  async function handleAiGoalSuggestion() {
    const habitName = form.getValues("name");
    if (!habitName) {
      form.setError("name", {
        type: "manual",
        message: "Please enter a habit name to get a suggestion.",
      });
      return;
    }

    setIsAiLoading(true);
    try {
      const result = await aiGoalSetting({
        habitName,
        // Mock data for AI
        historicalData:
          "User has been inconsistent, completing this habit 3-4 times a week.",
        currentStreak: 2,
        successRate: 60,
      });
      form.setValue("goal", result.suggestedGoal);
      toast({
        title: "AI Goal Suggestion",
        description: result.reasoning,
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not get AI suggestion.",
      });
    } finally {
      setIsAiLoading(false);
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle form submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>{habit ? "Edit Habit" : "Create a New Habit"}</CardTitle>
            <CardDescription>
              Fill in the details below to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Habit Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Read for 15 minutes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-3 gap-4 sm:grid-cols-5"
                    >
                      {habitIcons.map(({ name, icon, component: Icon }) => (
                        <FormItem key={icon}>
                          <FormControl>
                            <RadioGroupItem value={icon} className="sr-only" />
                          </FormControl>
                          <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                            <Icon className="mb-3 h-6 w-6" />
                            {name}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How often do you want to do this habit?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reminder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reminder Time</FormLabel>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input type="time" className="pl-9" {...field} />
                      </FormControl>
                    </div>
                    <FormDescription>
                      Set a time for a reminder notification.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal (Optional)</FormLabel>
                  <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                    <FormControl>
                      <Input placeholder="e.g., Complete 30 times" {...field} />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAiGoalSuggestion}
                      disabled={isAiLoading}
                    >
                      {isAiLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Lightbulb className="mr-2 h-4 w-4" />
                      )}
                      AI Suggest
                    </Button>
                  </div>
                  <FormDescription>
                    Set a target for your habit.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full sm:w-auto">
              {habit ? "Save Changes" : "Create Habit"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
