import { AppLayout } from "@/components/app-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, Calendar, Trophy } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const mockAnalytics = {
  successRate: 82,
  longestStreak: 33,
  weeklyProgress: [
    { day: "Mon", completed: 3 },
    { day: "Tue", completed: 2 },
    { day: "Wed", completed: 4 },
    { day: "Thu", completed: 3 },
    { day: "Fri", completed: 5 },
    { day: "Sat", completed: 2 },
    { day: "Sun", completed: 1 },
  ],
};

const chartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(var(--primary))",
  },
};

export default function AnalyticsPage() {
  const completedDays = [
    new Date(2024, 5, 2),
    new Date(2024, 5, 3),
    new Date(2024, 5, 9),
    new Date(2024, 5, 12),
    new Date(2024, 5, 14),
    new Date(2024, 6, 1),
    new Date(2024, 6, 5),
    new Date(2024, 6, 8),
    new Date(2024, 6, 15),
    new Date(2024, 6, 18),
    new Date(2024, 6, 22),
    new Date(2024, 6, 25),
    new Date(2024, 6, 29),
  ];

  return (
    <AppLayout title="Analytics">
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Overall Success Rate
              </CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockAnalytics.successRate}%
              </div>
              <p className="text-xs text-muted-foreground">
                Based on all recorded habits
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Longest Streak
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockAnalytics.longestStreak} days
              </div>
              <p className="text-xs text-muted-foreground">
                Your best consecutive run
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Habits This Week
              </CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                +
                {mockAnalytics.weeklyProgress.reduce(
                  (acc, cur) => acc + cur.completed,
                  0,
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Completed across all habits
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
              <CardDescription>
                Number of habits completed each day this week.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-64 w-full">
                <RechartsBarChart
                  data={mockAnalytics.weeklyProgress}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
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
                  <Bar
                    dataKey="completed"
                    fill="var(--color-completed)"
                    radius={4}
                  />
                </RechartsBarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Completion Calendar</CardTitle>
              <CardDescription>
                Days you completed at least one habit this year.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center justify-center">
              <CalendarComponent
                mode="multiple"
                selected={completedDays}
                defaultMonth={new Date()}
                className="rounded-md"
                classNames={{
                  day_selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
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
