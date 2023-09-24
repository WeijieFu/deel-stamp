export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export const _getDate = () => {
  return `${new Date().getDate()} ${
    monthNames[new Date().getMonth()]
  }, ${new Date().getFullYear()}`
}
