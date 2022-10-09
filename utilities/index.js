const formatedDate = (date, format = "") =>
  format === "" ? date.format("DD - MMM - YYYY") : date.format(format);

export { formatedDate };
