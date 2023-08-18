type Fn = (...args: any[]) => any
export class EventEmiter {
  events: Record<string, Fn[]> = {}
  on(name: string, fn: Fn): Fn {
    this.events[name] = this.events[name] || []
    this.events[name].push(fn)
    return () => {
      this.off(name, fn)
    }
  }
  once(name: string, fn: Fn): void {
    (fn as any).__proto__.once = true
    this.on(name, fn)
  }
  emit(name: string, ...args: any[]): void {
    const fns = this.events[name]
    if (!fns || !fns.length) {
      return
    }
    fns.forEach(fn => {
      fn.apply(this, args)
      if ((fn as any).once) {
        this.off(name, fn)
      }
    })
  }
  off(name: string, fn: Fn): void {
    const fns = this.events[name]
    if (!fns || !fns.length) {
      return
    }
    const idx = fns.findIndex(item => item === fn)
    if (idx === -1) {
      return
    }
    console.log('idx', idx)
    this.events[name].splice(idx, 1)
  }
}