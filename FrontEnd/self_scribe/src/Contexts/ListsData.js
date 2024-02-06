import { createContext } from "react";

//  define shape of the context (keys matter, values change)
const defaultLists = [{ meditate: Boolean, sleep: Number }];

// create the context based on the shape you provide
export const ListsData = createContext(defaultLists);
