type Fn = (...args: any[]) => any
export async function asyncPool(tasks: Fn[], limit: number): Promise<any> {
  const allTasks = []
  const excutingTasks: any[] = []
  for (const task of tasks) {
    const p = Promise.resolve().then(() => task())
    allTasks.push(p)
    if (limit < tasks.length) {
      const e: any = p.then(() => excutingTasks.splice(excutingTasks.indexOf(e), 1))
      excutingTasks.push(e)
      if (excutingTasks.length >= limit) {
        await Promise.race(excutingTasks)
      }
    }
  }
  await Promise.all(allTasks)
}


const fn1 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fn1');
      resolve('fn1');
    }, 500);
  });
};
const fn2 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fn2');
      resolve('fn2');
    }, 20);
  });
};
const fn3 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fn3');
      resolve('fn3');
    }, 500);
  });
};
const fn4 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fn4');
      resolve('fn4');
    }, 100);
  });
};

// asyncPool([fn1, fn2, fn3, fn4], 2)