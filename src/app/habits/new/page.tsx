import { AppLayout } from "@/components/app-layout";
import { HabitForm } from "@/components/habits/habit-form";

export default function NewHabitPage() {
  return (
    <AppLayout title="Add New Habit">
      <div className="mx-auto max-w-2xl">
        <HabitForm />
      </div>
    </AppLayout>
  );
}
