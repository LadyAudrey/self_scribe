import { createTask } from "./tasks-controller";

// TDL - reserach timestamp differences projects and tactics
// deploy to vercel to see if it's possible
// tweak UI so the taskName is stable (DONE!)
// testing on tasks

describe("tasks-controller", () => {
  const user = "audrey";
  let id;
  // add
  describe("create-task", () => {
    const description = "I'm a test task";
    it("should add a new task", async () => {
      const response = createTask();
      expect(response).toBeDefined();
      console.log(response);
      //   id = response.rows[0].id;
      //   exp(id).toBeGreaterThan(0);
    });
  });
  // read
  describe("get-tasks", () => {});
  // edit
  // delete
});
