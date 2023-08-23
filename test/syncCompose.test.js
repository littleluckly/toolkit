import { syncCompose } from "../src/libs/compose/SyncCompose";

describe("同步compose", () => {
  it("按顺序执行，且携带普通函数", async () => {
    const result = [];
    const fn1 = (num) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          result.push(num++);
          resolve(num++);
        }, 500);
      });
    };
    const fn2 = (num) => {
      result.push(num++);
      return num++;
    };
    const fn3 = (num) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          result.push(num++);
          resolve(num++);
        }, 300);
      });
    };

    const composeFn = syncCompose([fn1, fn2, fn3]);
    await composeFn(1);
    expect(result).toEqual([1, 2, 3]);
  });

  it("函数报错", async () => {
    const result = [];
    const fn1 = (num) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          result.push(num++);
          resolve(num++);
        }, 500);
      });
    };
    const fn2 = (num) => {
      return new Promise((_, reject) => {
        setTimeout(() => {
          result.push(num++);
          reject("fn2");
        }, 100);
      });
    };
    const composeFn = syncCompose([fn1, fn2]);
    try {
      await composeFn(1);
    } catch (error) {
      expect(error === "fn2");
      expect(result).toEqual([1, 2]);
    }
  });
});
