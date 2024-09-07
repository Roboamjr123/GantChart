// Function to calculate the number of days between two dates
function calculateDuration(startDate: Date, PlannedendDate: Date): number {
  const start = new Date(startDate);
  const end = new Date(PlannedendDate);
  const diffInMs = end.getTime() - start.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  return diffInDays;
}

export const taskFields = {
  id: "TaskID",
  name: "TaskName",
  startDate: "PlannedStartDate",
  endDate: "PlannedEndDate",
  duration: "Week",
  progress: "Progress",
  baselineStartDate: "ActualStartDate",
  baselineEndDate: "ActualEndDate",
  child: "subtasks",
  dependency: "Predecessor",
};

interface Task {
  TaskID: number;
  TaskName: string;
  PlannedStartDate: Date;
  PlannedEndDate: Date;
  ActualStartDate?: Date;
  ActualEndDate?: Date;
  subtasks: Subtask[];
}

interface Subtask {
  TaskID: number;
  TaskName: string;
  PlannedStartDate: Date;
  PlannedEndDate: Date;
  ActualStartDate?: Date;
  ActualEndDate?: Date;
  Progress: number;
  Week: number; // Duration in days
  Predecessor?: string;
  subtasks?: Subtask[]; // Optional nested subtasks
}

export const GanttSyncData: Task[] = [
  {
    TaskID: 1,
    TaskName: "Project Initiation",
    PlannedStartDate: new Date("2023-01-01"),
    PlannedEndDate: new Date("2023-03-31"),
    ActualStartDate: new Date("2023-01-01"),
    ActualEndDate: new Date("2023-03-30"),
    subtasks: [
      {
        TaskID: 2,
        TaskName: "Identify Site location",
        PlannedStartDate: new Date("2023-01-05"),
        PlannedEndDate: new Date("2023-02-10"),
        ActualStartDate: new Date("2023-01-05"),
        ActualEndDate: new Date("2023-02-12"),
        Week: calculateDuration(new Date("2023-01-05"), new Date("2023-02-10")),
        Progress: 60,
      },
      {
        TaskID: 3,
        TaskName: "Perform Soil test",
        PlannedStartDate: new Date("2023-02-12"),
        PlannedEndDate: new Date("2023-02-20"),
        ActualStartDate: new Date("2023-02-13"),
        ActualEndDate: new Date("2023-02-21"),
        Week: calculateDuration(new Date("2023-02-12"), new Date("2023-02-20")),
        Progress: 70,
        Predecessor: "2FS",
      },
      {
        TaskID: 4,
        TaskName: "Soil test approval",
        PlannedStartDate: new Date("2023-02-21"),
        PlannedEndDate: new Date("2023-03-01"),
        ActualStartDate: new Date("2023-02-22"),
        ActualEndDate: new Date("2023-03-02"),
        Week: calculateDuration(new Date("2023-02-21"), new Date("2023-03-01")),
        Progress: 50,
        Predecessor: "3FS",
      },
    ],
  },
  {
    TaskID: 5,
    TaskName: "Project Estimation",
    PlannedStartDate: new Date("2023-04-01"),
    PlannedEndDate: new Date("2023-05-15"),
    ActualStartDate: new Date("2023-04-01"),
    ActualEndDate: new Date("2023-05-14"),
    subtasks: [
      {
        TaskID: 6,
        TaskName: "Develop floor plan for estimation",
        PlannedStartDate: new Date("2023-04-02"),
        PlannedEndDate: new Date("2023-04-10"),
        ActualStartDate: new Date("2023-04-02"),
        ActualEndDate: new Date("2023-04-11"),
        Week: calculateDuration(new Date("2023-04-02"), new Date("2023-04-10")),
        Progress: 80,
      },
      {
        TaskID: 7,
        TaskName: "List materials",
        PlannedStartDate: new Date("2023-04-11"),
        PlannedEndDate: new Date("2023-04-18"),
        ActualStartDate: new Date("2023-04-12"),
        ActualEndDate: new Date("2023-04-19"),
        Week: calculateDuration(new Date("2023-04-11"), new Date("2023-04-18")),
        Progress: 60,
        Predecessor: "6FS",
      },
      {
        TaskID: 8,
        TaskName: "Estimation approval",
        PlannedStartDate: new Date("2023-04-19"),
        PlannedEndDate: new Date("2023-05-05"),
        ActualStartDate: new Date("2023-04-20"),
        ActualEndDate: new Date("2023-05-06"),
        Week: calculateDuration(new Date("2023-04-19"), new Date("2023-05-05")),
        Progress: 40,
        Predecessor: "7FS",
      },
    ],
  },
];
