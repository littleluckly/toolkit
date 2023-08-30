type Fn = (...args: any[]) => any
/**
 * 在规定的时间(delay)内，节流的函数fn只执行一次
 * @param fn 
 * @param delay 
 * @returns 
 */
export function throttle(fn: Fn, delay: number) {
  let start = Date.now()
  return function (...args: any[]) {
    if (Date.now() - start >= delay) {
      start = Date.now()
      fn.apply(this, args)
    }
  }
}