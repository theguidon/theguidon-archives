export const DateFormatter = (d) => {
  let date = new Date(d);

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};
