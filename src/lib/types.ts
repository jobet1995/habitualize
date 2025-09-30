export type Habit = {
  id: string;
  name: string;
  icon: string;
  streak: number;
  successRate: number;
  goal: {
    target: number;
    current: number;
    unit: string;
  };
  goalProgress: number;
  isCompletedToday: boolean;
  frequency: "daily" | "weekly";
  days: ("Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun")[];
};

export type HabitHistory = {
  date: Date;
  completed: boolean;
};

export type AnalyticsData = {
  successRate: number;
  longestStreak: number;
  weeklyProgress: {
    day: string;
    completed: number;
  }[];
};
