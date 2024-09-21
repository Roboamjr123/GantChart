import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Task interface definition
export interface Task {
  task_Id: number;
  task_Name: string;
  plannedStartDate: string; // Accept both string and Date
  plannedEndDate: string;
  actualStartDate: string | null;
  actualEndDate: string | null;
  duration: number;
  progress: number;
  project_Id: number;
}

const API_BASE_URL = "https://localhost:7226/api";

// Add Task
const addTask = async (newTask: Task): Promise<Task> => {
  const response = await axios.post(`${API_BASE_URL}/Task/Add-Task`, newTask, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("Response from API:", response.data); // Log the response
  return response.data; 
};

// Custom hook to use the add task mutation
export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] }); // Invalidate tasks query
    },
    onError: (error) => {
      console.error("Error adding task:", error);
    },
  });
};

// Fetch tasks from API
export const GetAllTask = () => {
  return useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/Task/Get-All-Task`);
      return response.data;
    },
    staleTime: 5000, // Optional: Refetch data every 5 seconds
  });
};

// Update Task
const updateTask = async (updatedTask: Task) => {
  const response = await axios.put(`${API_BASE_URL}/Task/Update-Task`, updatedTask);
  return response.data;
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error updating task:", error);
    },
  });
};

// Delete Task
const deleteTask = async (task_Id: number) => {
  await axios.delete(`${API_BASE_URL}/Task/Delete-Task?taskId=${task_Id}`);
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error deleting task:", error);
    },
  });
};
