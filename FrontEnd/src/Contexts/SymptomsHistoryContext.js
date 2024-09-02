import { createContext } from "react";

//  define shape of the context (keys matter, values change)
const DefaultSymptomHistory = {
  symptomHistory: [
    {
      id: 1,
      symptom_id: 1,
      created_on: "2024-01-29 08:32:56.916733-08",
      intensity: 1,
      notes: "",
    },
  ],
  setSymptomHistory: (new_value) => {},
};

// create the context based on the shape you provide
export const SymptomHistoryContext = createContext(DefaultSymptomHistory);
