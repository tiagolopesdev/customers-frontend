
function formatDate(dateString: string): string {

  const year = dateString.substring(0, 4);
  const month = dateString.substring(5, 7);
  const day = dateString.substring(8, 10);
  const hour = dateString.substring(11, 13);
  const minute = dateString.substring(14, 16);

  return `${day}/${month}/${year} ${hour}:${minute}`;
}

export default formatDate;
