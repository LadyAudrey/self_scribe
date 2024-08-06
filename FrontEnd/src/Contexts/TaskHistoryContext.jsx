import { createContext } from "react";

//  define shape of the context (keys matter, values change)
const DefaultTaskHistory = {
  taskHistory: [
    {
      id: 1,
      task_id: 1,
      created_on: "2024-01-29 08:32:56.916733-08",
      completed: "2024-01-29 08:32:56.916733-08",
      notes: "",
    },
  ],
  setTaskHistory: (new_value) => {},
};

// create the context based on the shape you provide
export const TaskHistoryContext = createContext(DefaultTaskHistory);
