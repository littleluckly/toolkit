import { debounce } from "../src/libs/debounce/Debounce";
describe("防抖", () => {
  it("防抖", async () => {
    let res = [];
    const text = "只执行一次";
    const fn = () => {
      res.push(text);
    };
    const debounceFn = debounce(fn, 200);

    const start = Date.now();
    const timer = setInterval(() => {
      debounceFn();
      if (Date.now() - start > 100) {
        clearInterval(timer);
      }
    }, 50);
    setTimeout(() => {
      expect(res).toEqual([text]);
    }, 400);
  });
});
