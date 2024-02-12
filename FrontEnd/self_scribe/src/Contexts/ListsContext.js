import { createContext } from "react";

//  define shape of the context (keys matter, values change)
const defaultLists = {
  lists: [
    {
      created_on: "2024-01-29T16:32:56.916Z",
      id: 27,
      last_updated: "2024-01-29 08:32:56.916733-08",
      name: "gfgsfaa",
      user_name: "audrey",
      active: true,
    },
  ],
  setLists: (new_value) => {},
};

// create the context based on the shape you provide
export const ListsContext = createContext(defaultLists);
