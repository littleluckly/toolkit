type Fn = (...args: any[]) => any
export async function asyncPool(tasks: Fn[], limit: number): Promise<any> {
  return new Promise(resolve => {
    const result: any[] = []
    let index = 0
    if (tasks.length === 0) {
      return result
    }
    async function request() {
      const i = index
      const task = tasks[index++]
      if (i >= tasks.length) {
        return result
      }
      try {
        const res = await task()
        result[i] = res
      } catch (err) {
        result[i] = err
      } finally {
        if (result.length === tasks.length) {
          resolve(result)
        }
        request()
      }
    }
    for (let i = 0; i < Math.min(tasks.length, limit); i++) {
      request()
    }
  })
}


const fn1 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('fn1');
    }, 50);
  });
};
const fn2 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('fn2');
    }, 50);
  });
};
const fn3 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('fn3');
    }, 50);
  });
};
const fn4 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('fn4');
    }, 50);
  });
};
const fn6 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('fn6');
    }, 50);
  });
};
const fn5 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('fn5');
    }, 50);
  });
};

const testFn = async () => {
  const res = await asyncPool([fn1, fn2, fn3, fn4, fn5, fn6], 2)
  console.log('res', res);
}
// testFn()