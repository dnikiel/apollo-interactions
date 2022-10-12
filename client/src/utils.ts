// Return readable date
const formatDate = (date: string) => {
  const newDate = new Date(date);

  return newDate.toLocaleString();
};

export { formatDate };
