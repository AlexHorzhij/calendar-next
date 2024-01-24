export const convertMinutesToHourAndMinutes = (event: IEvent | null) => {
  if (!event) return { start: "00", end: "00" };

  const startHours = Math.floor(event.start / 60)
    .toString()
    .padStart(2, "0");
  const startMin = (event.start % 60).toString().padEnd(2, "0");
  const start = `${startHours}:${startMin}`;

  const endHours = Math.floor((event.start + event.duration) / 60)
    .toString()
    .padStart(2, "0");
  const endMin = ((event.start + event.duration) % 60)
    .toString()
    .padStart(2, "0");
  const end = `${endHours}:${endMin}`;

  return { start, end };
};
