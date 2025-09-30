import { AppLayout, getHabitIcon } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import type { Habit } from "@/lib/types";
import { Flame, Target, Percent, Edit } from "lucide-react";
import Link from "next/link";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

const mockHabit: Habit = {
  id: "2",
  name: "Morning workout",
  icon: "dumbbell",
  streak: 5,
  successRate: 65,
  goal: { target: 20, current: 5, unit: "sessions" },
  isCompletedToday: false,
  frequency: "daily",
  days: ["Mon", "Wed", "Fri"],
  goalProgress: 25,
};

const mockHistory = [
  { month: "Jan", completions: 10 },
  { month: "Feb", completions: 12 },
  { month: "Mar", completions: 8 },
  { month: "Apr", completions: 15 },
  { month: "May", completions: 13 },
  { month: "Jun", completions: 5 },
];

const chartConfig = {
  completions: {
    label: "Completions",
    color: "hsl(var(--primary))",
  },
};

const completedDays = [
  new Date(2024, 5, 2),
  new Date(2024, 5, 4),
  new Date(2024, 5, 6),
  new Date(2024, 5, 9),
  new Date(2024, 5, 14),
  new Date(2024, 6, 1),
  new Date(2024, 6, 3),
  new Date(2024, 6, 5),
  new Date(2024, 6, 8),
  new Date(2024, 6, 12),
  new Date(2024, 6, 15),
  new Date(2024, 6, 18),
];

export default function HabitDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const Icon = getHabitIcon(mockHabit.icon);
  const progress = (mockHabit.goal.current / mockHabit.goal.target) * 100;

  return (
    <AppLayout title="Habit Details">
      <div className="space-y-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <Icon className="h-12 w-12 text-primary" />
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                {mockHabit.name}
              </h2>
              <p className="text-muted-foreground">Last synced: 2 mins ago</p>
            </div>
          </div>
          <Button asChild>
            <Link href={`/habits/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Habit
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Streak
              </CardTitle>
              <Flame className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockHabit.streak} days</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Success Rate
              </CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockHabit.successRate}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Goal</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockHabit.goal.target} {mockHabit.goal.unit}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="mb-2 text-lg font-semibold">
            Goal Progress: {mockHabit.goal.current}/{mockHabit.goal.target}{" "}
            {mockHabit.goal.unit}
          </h3>
          <Progress value={progress} />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Completion History</CardTitle>
              <CardDescription>
                Completions per month this year.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-64 w-full">
                <LineChart
                  data={mockHistory}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    allowDecimals={false}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Line
                    dataKey="completions"
                    type="monotone"
                    stroke="var(--color-completions)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Completion Calendar</CardTitle>
              <CardDescription>Days this habit was completed.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <CalendarComponent
                mode="multiple"
                selected={completedDays}
                defaultMonth={new Date()}
                className="rounded-md"
                classNames={{
                  day_selected:
                    "bg-primary/80 text-primary-foreground hover:bg-primary/90",
                }}
                disabled
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
