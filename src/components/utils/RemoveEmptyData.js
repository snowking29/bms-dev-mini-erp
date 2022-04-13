export const removeEmptyData = (obj) => {
    Object.keys(obj).forEach(k =>
      (obj[k] && typeof obj[k] === 'object') && removeEmptyData(obj[k]) ||
      (!obj[k] && obj[k] !== undefined) && delete obj[k]
    );
    return obj;
};