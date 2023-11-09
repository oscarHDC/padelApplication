export function formatDate(inputDate) {
  const date = new Date(inputDate);
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  return formattedDate;
}

export function formatTime(inputTime) {
  const time = new Date(inputTime);
  const formattedTime = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
  return formattedTime;
}

export default{
  formatDate,
  formatTime,
}