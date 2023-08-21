export const maskLocal = (local: string | number) => {
  const data = String(local);

  return data.replace(/(\d{2})(\d{3})(\d{3})(\d)/, "$1.$2.$3.$4");
};
