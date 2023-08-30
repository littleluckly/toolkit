import { throttle } from "../src/libs/throttle/Throttle";
describe("节流", () => {
  it("节流", async () => {
    let res = [];
    const text = "执行了";
    const fn = () => {
      res.push(text);
    };
    const throttleFn = throttle(fn, 100);

    const start = Date.now();
    const timer = setInterval(() => {
      throttleFn();
      if (Date.now() - start > 200) {
        clearInterval(timer);
      }
    }, 50);
    setTimeout(() => {
      expect(res).toEqual([text, text]);
    }, 400);
  });
});
