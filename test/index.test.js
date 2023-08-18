import { EventEmiter } from "../src/libs/event-emiter/EventEmiter";

describe("EventEmiter", () => {
  it("订阅发布", () => {
    const emiter = new EventEmiter();
    let num = 1;
    emiter.on("test", () => (num += 1));
    emiter.emit("test");
    expect(num).toBe(2);
  });
  it("发布携带参数", () => {
    const emiter = new EventEmiter();
    let num = 1;
    emiter.on("test", (d) => (num += d));
    emiter.emit("test", 2);
    expect(num).toBe(3);
  });

  it("取消订阅1", () => {
    const emiter = new EventEmiter();
    let num = 1;
    const fn = () => (num += 1);
    const off = emiter.on("test", fn);
    off();
    emiter.emit("test");
    expect(num).toBe(1);
  });

  it("取消订阅2", () => {
    const emiter = new EventEmiter();
    let num = 1;
    const fn = () => (num += 1);
    emiter.on("test", fn);
    emiter.off("test", fn);
    emiter.emit("test");
    expect(num).toBe(1);
  });

  it("多次发布", () => {
    const emiter = new EventEmiter();
    let num = 1;
    const fn = () => (num += 1);
    emiter.on("test", fn);
    emiter.emit("test");
    emiter.emit("test");
    expect(num).toBe(3);
  });

  it("单次订阅", () => {
    const emiter = new EventEmiter();
    let num = 1;
    const fn = () => (num += 1);
    emiter.once("test", fn);
    emiter.emit("test");
    emiter.emit("test");
    expect(num).toBe(2);
  });
});
