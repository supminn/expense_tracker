const formatedDate = (date, format = "") =>
  format === "" ? date.format("DD - MMM - YYYY") : date.format(format);

const generateRandomString = (
  length = 16,
  chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
) => {
  let result = "";
  for (let i = length; i > 0; i -= 1) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

export { formatedDate, generateRandomString };
