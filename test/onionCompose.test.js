import { OnionCompose } from "../src/libs/onion-compose/OnionCompose";
describe("Onion-Compose洋葱圈模型", () => {
  it("顺序调用", async () => {
    const onionCompose = new OnionCompose();
    const result = [];
    onionCompose.add({
      level: 0,
      middleware: async (_, next) => {
        result.push("0");
        await next();
        result.push("1");
      },
    });
    onionCompose.add({
      level: 1,
      middleware: async (_, next) => {
        result.push("2");
        await next();
        result.push("3");
      },
    });
    await onionCompose.dispatch();
    expect(result).toEqual(["0", "2", "3", "1"]);
  });
});
