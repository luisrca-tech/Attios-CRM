export const calculateItemPerPage = (extraItemHeight: number) => {
  const minimalHeight = 1020;
  const minimalItemPerPage = 8;

  if (typeof window === "undefined") {
    return minimalItemPerPage;
  }

  const pageHeight = window.innerHeight;
  const actualExtraHeight = pageHeight - minimalHeight;
  return Math.max(
    minimalItemPerPage,
    minimalItemPerPage + Math.floor(actualExtraHeight / extraItemHeight)
  );
};
