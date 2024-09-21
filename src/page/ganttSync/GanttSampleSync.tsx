import {
  GanttComponent,
  Inject,
  Toolbar,
  Edit,
  ColumnsDirective,
  ColumnDirective,
  Selection,
  Filter,
} from "@syncfusion/ej2-react-gantt";
import {
  Task,
  GetAllTask,
  useAddTask,
  useUpdateTask,
  useDeleteTask,
} from "./data";

// Function to transform task data for Gantt
function transformTaskData(tasks: Task[]) {
  return tasks.map((task) => ({
    TaskID: task.task_Id || 0,
    TaskName: task.task_Name || "Unnamed Task",
    PlannedStartDate: task.plannedStartDate
      ? new Date(task.plannedStartDate)
      : new Date(),
    PlannedEndDate: task.plannedEndDate
      ? new Date(task.plannedEndDate)
      : new Date(),
    ActualStartDate: task.actualStartDate
      ? new Date(task.actualStartDate)
      : new Date(),
    ActualEndDate: task.actualEndDate
      ? new Date(task.actualEndDate)
      : new Date(),
    Duration: task.duration || 0,
    Progress: task.progress || 0,
    project_Id: 6, // Add this line if needed
  }));
}

const GanttSampleSync = () => {
  // Fetch tasks using React Query
  const { data: tasks, isLoading, isError, error } = GetAllTask();
  const addTaskMutation = useAddTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  // Transform tasks for Gantt
  const ganttData = tasks ? transformTaskData(tasks) : [];

  // Loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (isError) {
    return <div>Error fetching tasks: {error.message}</div>;
  }

  const handleAddTask = async (newTask: Task) => {
    try {
      await addTaskMutation.mutateAsync(newTask);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      await updateTaskMutation.mutateAsync(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTaskMutation.mutateAsync(taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="p-5">
      <GanttComponent
        dataSource={ganttData}
        taskFields={{
          id: "TaskID", // Specify the primary key column
          name: "TaskName",
          startDate: "PlannedStartDate",
          endDate: "PlannedEndDate",
          baselineStartDate: "ActualStartDate",
          baselineEndDate: "ActualEndDate",
          duration: "Duration",
          progress: "Progress",
        }}
        height="450px"
        toolbar={["Add", "Edit", "Delete", "Update", "Cancel", "Search"]}
        enableImmutableMode={true}
        allowSelection={true}
        editSettings={{
          allowAdding: true,
          allowEditing: true,
          allowDeleting: true,
          allowTaskbarEditing: true,
          showDeleteConfirmDialog: true,
          mode: "Dialog",
        }}
        actionComplete={(args) => {
          if (args.requestType === "save" && args.data) {
            const taskData = {
              task_Id: args.data.TaskID,
              task_Name: args.data.TaskName,
              plannedStartDate: args.data.PlannedStartDate.toISOString(),
              plannedEndDate: args.data.PlannedEndDate.toISOString(),
              actualStartDate: args.data.ActualStartDate
                ? args.data.ActualStartDate.toISOString()
                : null,
              actualEndDate: args.data.ActualEndDate
                ? args.data.ActualEndDate.toISOString()
                : null,
              duration: args.data.Duration,
              progress: args.data.Progress,
              project_Id: args.data.project_Id || 5,
            };

            if (args.data.TaskID) {
              handleUpdateTask(taskData); // Update existing task
            } else {
              handleAddTask(taskData); // Add new task
            }
          } else if (args.requestType === "delete" && args.data) {
            handleDeleteTask(args.data.TaskID); // Delete task
          }
        }}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="TaskID" // Primary Key
            headerText="Task ID"
            isPrimaryKey={true} // Set this property to true
            visible={false} // Optional: hide if not needed in UI
          />
          <ColumnDirective
            field="TaskName"
            headerText="Task Name"
            width="250"
            allowFiltering={true}
          />
          <ColumnDirective
            field="PlannedStartDate"
            headerText="Start Date"
            format="MM/dd/yyyy"
            allowFiltering={true}
          />
          <ColumnDirective
            field="PlannedEndDate"
            headerText="End Date"
            format="MM/dd/yyyy"
            allowFiltering={true}
          />

          <ColumnDirective
            field="Duration"
            headerText="Duration"
            format="N0"
            allowFiltering={true}
          />
          {/* Add more columns as needed */}
        </ColumnsDirective>
        <Inject services={[Toolbar, Edit, Selection, Filter]} />
      </GanttComponent>
    </div>
  );
};

export default GanttSampleSync;
