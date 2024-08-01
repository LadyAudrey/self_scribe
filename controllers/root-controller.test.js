import { getHello } from "./root-controller";

describe("root controller", () => {
  describe("testing getHello", () => {
    it("should return Hello World", () => {
      expect(getHello()).toEqual("Hellooooooo World!");
    });
  });
});
