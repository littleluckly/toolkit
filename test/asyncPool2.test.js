import { asyncPool } from "../src/libs/async-pool/AsyncPool2";
describe("并发控制", () => {
  it("测试并发", async () => {
    const result = [];

    const fn1 = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          result.push("fn1");
          resolve("fn1");
        }, 100);
      });
    };
    const fn2 = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          result.push("fn2");
          resolve("fn2");
        }, 50);
      });
    };
    const fn3 = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          result.push("fn3");
          resolve("fn3");
        }, 30);
      });
    };
    const fn4 = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          result.push("fn4");
          resolve("fn4");
        }, 30);
      });
    };
    await asyncPool([fn1, fn2, fn3, fn4], 2);
    expect(result).toEqual(["fn2", "fn3", "fn1", "fn4"]);
  });
});
