export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};
