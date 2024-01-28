export const convertTimeToMinutes = (time: string) => {
  const timeArr = time.split(':');
  return Number(timeArr[0]) * 60 + Number(timeArr[1]);
};
