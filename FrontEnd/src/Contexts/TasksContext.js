import { createContext } from "react";

//  define shape of the context (keys matter, values change)
const DefaultTasks = {
  tasks: [
    {
      id: 27,
      list_id: 14,
      last_updated: "2024-01-29 08:32:56.916733-08",
      name: "gfgsfaa",
      user_name: "audrey",
      created_on: "2024-01-29T16:32:56.916Z",
      repeats: true,
      frequency: "1:1",
    },
  ],
  setTasks: (new_value) => {},
};

// create the context based on the shape you provide
export const TasksContext = createContext(DefaultTasks);
