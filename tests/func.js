export const getTimeSpan = async (isError = false) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      if (isError) {
        return _reject(new Error("test"));
      }
      resolve(Date.now());
    }, 200);
  });
};
