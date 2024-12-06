export const calculateItemPerPage = (extraItemHeight: number) => {
  const minimalHeight = 1020;

  const pageHeight = window.innerHeight;
  const actualExtraHeight = pageHeight - minimalHeight;
  const minimalItemPerPage = 8;
  return Math.max(
    minimalItemPerPage,
    minimalItemPerPage + Math.floor(actualExtraHeight / extraItemHeight)
  );
};