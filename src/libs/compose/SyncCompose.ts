type Fn = (...args: any[]) => any
export const syncCompose = (fns: Fn[]) => {
  return function (...args: any[]) {
    return fns.reduce((prevePromise, currPromise) => {
      return Promise.resolve(prevePromise).then(result => currPromise.call(null, result))
    }, Promise.resolve(fns.shift()?.apply(null, args)))
  }
}
