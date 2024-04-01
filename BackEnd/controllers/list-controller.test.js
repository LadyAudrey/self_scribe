import { getLists, createList, editList, deleteList } from "./list-controller";

describe("list-controller", () => {
  const user = "audrey";
  let id;

  describe("createList", () => {
    const listName = "Testing";
    const description = "sanity";
    it("should add a new list", async () => {
      const response = await createList(user, listName, description);
      expect(response).toBeDefined();
      id = response.rows[0].id;
      expect(id).toBeGreaterThan(0);
    });
  });
  
  describe("getLists", () => {
    it("should get all lists for a given user", async () => {
      expect(await getLists(user)).toBeDefined();
    });
  });

  describe("editList", () => {
    const newName = "testing";
    it("should edit a list", async () => {
      expect(id).toBeGreaterThan(0);
      expect(await editList(newName, id)).toBeDefined();
    });
  });
  // delete list

  describe("deleteList", () => {
    it("should delete a list", async () => {
      expect(id).toBeGreaterThan(0);
      expect(await deleteList(id)).toBeDefined();
    });
  });
});
