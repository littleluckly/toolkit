import { throttle } from "../src/libs/throttle/Throttle";
describe("防抖", () => {
  it("防抖", async () => {
    let res = [];
    const fn = () => {
      res.push("只执行一次");
    };
    const throttleFn = throttle(fn, 600);

    const start = Date.now();
    const testFn = () =>
      new Promise((resolve) => {
        const timer = setInterval(() => {
          if (Date.now() - start > 4000) {
            clearInterval(timer);
            resolve(true);
          }
          console.log("throttleFn");
          throttleFn();
        }, 500);
      });
    await testFn();
    expect(res).toEqual(["只执行一次"]);
  });
});
