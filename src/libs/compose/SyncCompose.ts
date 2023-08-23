type Fn = (...args: any[]) => any

export const syncCompose2 = (fns: Fn[]) => {
  let i = 0
  return function dispatch(...args: any[]): any {
    return Promise.resolve(fns[i].apply(null, args)).then(result => {
      i += 1
      if (i < fns.length) {
        return dispatch(result)
      }
      return Promise.resolve(result)
    })
  }
}


export const syncCompose = (fns: Fn[]) => {
  return function (...args: any[]) {
    return fns.reduce((prevePromise, currPromise) => {
      return Promise.resolve(prevePromise).then(result => currPromise.call(null, result))
    }, Promise.resolve(fns.shift()?.apply(null, args)))
  }
}


