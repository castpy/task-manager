export const convertDate = (dateString?: string | null): string | null => {
  if (!dateString) return null;

  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("pt-BR");
};
