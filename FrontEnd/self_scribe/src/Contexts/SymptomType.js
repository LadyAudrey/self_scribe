import { createContext } from "react";

//  define shape of the context (keys matter, values change)
const defaultSymptomTypes = {
  SymptomTypes: [
    {
      created_on: "2024-01-29T16:32:56.916Z",
      id: 27,
      last_updated: "2024-01-29 08:32:56.916733-08",
      name: "Im a symptom type :)",
      user_name: "audrey",
      active: true,
    },
  ],
  setSymptomTypes: (new_value) => {},
};

// create the context based on the shape you provide
export const SymptomTypesContext = createContext(defaultSymptomTypes);
