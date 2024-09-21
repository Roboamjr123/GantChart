import React from "react";
import {
  Gantt,
  Task,
  ViewMode,
} from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { tasks as allTasks } from "./ganttData";

// Function to filter out weekends and convert to proper Date objects
const filterOutWeekends = (tasks: Task[]) => {
  return tasks.map((task) => {
    const startDate = new Date(task.start);
    const endDate = new Date(task.end);

    // Adjust the start date to the next weekday if it falls on a weekend
    if (startDate.getDay() === 0) {
      // Sunday
      startDate.setDate(startDate.getDate() + 1);
    } else if (startDate.getDay() === 6) {
      // Saturday
      startDate.setDate(startDate.getDate() + 2);
    }

    // Adjust the end date if it falls on a weekend
    if (endDate.getDay() === 0) {
      // Sunday
      endDate.setDate(endDate.getDate() - 1);
    } else if (endDate.getDay() === 6) {
      // Saturday
      endDate.setDate(endDate.getDate() - 1);
    }

    return {
      ...task,
      start: startDate,
      end: endDate,
    };
  });
};

// Preprocess tasks data
const tasks = filterOutWeekends(allTasks);

const GanttSample = () => {
  return (
    <div className="p-4">
      <Gantt
        tasks={tasks}
        ganttHeight={300}
        columnWidth={20}
        viewMode={ViewMode.Day}
        handleWidth={5}
        arrowIndent={20}
        listCellWidth="10"
      />
    </div>
  );
};

export default GanttSample;
