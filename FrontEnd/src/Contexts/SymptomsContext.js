import { createContext } from "react";

//  define shape of the context (keys matter, values change)
const defaultSymptoms = {
  symptoms: [
    {
      id: 27,
      name: "gfgsfaa",
      created_on: "2024-01-29T16:32:56.916Z",
      last_updated: "2024-01-29 08:32:56.916733-08",
      user_name: "audrey",
      description: "",
      category: "",
    },
  ],
  setSymptoms: (new_value) => {},
};

// create the context based on the shape you provide
export const SymptomsContext = createContext(defaultSymptoms);
