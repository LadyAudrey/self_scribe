import { getLists, createList, editList } from "./list-controller";

describe("list-controller", () => {
  const user = "audrey";
  describe("getLists", () => {
    it("should get all lists for a given user", async () => {
      expect(await getLists(user)).toBeDefined();
    });
  });
  describe("createList", () => {
    const listName = "Testing";
    const description = "sanity";
    it("should add a new list", async () => {
      expect(await createList(user, listName, description)).toBeDefined();
    });
    // How do I get the id from the createList to then edit and delete it?
    // edit list
    describe("editList", () => {
      const newName = "testing";
      it("should edit a list", async () => {
        expect(await editList(newName, id)).toBeDefined();
      });
    });
    // delete list
  });
});
