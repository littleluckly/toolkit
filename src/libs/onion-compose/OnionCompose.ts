type Middleware<T> = {
  level: number,
  middleware: (context: T | undefined, next: () => Promise<any>) => void
}
export class OnionCompose<T> {
  middlewares: Middleware<T>[] = []

  add(middleware: Middleware<T>): () => void {
    const idx = this.middlewares.findIndex(mid => mid.level > middleware.level) - 1
    this.middlewares.splice(idx < -1 ? this.middlewares.length : idx, 0, middleware)
    return () => {
      this.remove(middleware)
    }
  }

  remove(middleware: Middleware<T>) {
    const idx = this.middlewares.findIndex(mid => mid === middleware)
    idx > -1 && this.middlewares.splice(idx, 1)
  }

  dispatch(context?: T) {
    const that = this
    let idx = -1
    return excute(0)
    function excute(i: number): Promise<any> {
      if (i <= idx) return Promise.reject(new Error('next() called multiple times'));
      idx = i
      const fn = that.middlewares[i]
      if (i === that.middlewares.length) {
        return Promise.resolve()
      }
      try {
        return Promise.resolve(fn.middleware(context, excute.bind(that, i + 1)))
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
}