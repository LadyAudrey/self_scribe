import { createContext } from "react";

//  define shape of the context (keys matter, values change)
const DefaultGraphItems = {
  graphItems: [
    {
      id: 1,
      task_id: 1,
      created_on: "2024-01-29 08:32:56.916733-08",
      completed: "2024-01-29 08:32:56.916733-08",
      notes: "",
    },
  ],
  setGraphItems: (new_value) => {},
};

// create the context based on the shape you provide
export const GraphItemsContext = createContext(DefaultGraphItems);
