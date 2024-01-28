import { START_TIME_TABLE } from '@/app/data/time';

export const convertMinutesToHourAndMinutes = (event: IEvent | null) => {
  const defaultTime = Math.floor(START_TIME_TABLE / 60)
    .toString()
    .padStart(2, '0');

  if (!event) return { start: defaultTime, end: '00' };

  const startTime = event.start + START_TIME_TABLE;

  const startHours = Math.floor(startTime / 60)
    .toString()
    .padStart(2, '0');
  const startMin = (startTime % 60).toString().padEnd(2, '0');
  const start = `${startHours}:${startMin}`;

  const endHours = Math.floor((startTime + event.duration) / 60)
    .toString()
    .padStart(2, '0');
  const endMin = ((startTime + event.duration) % 60)
    .toString()
    .padStart(2, '0');
  const end = `${endHours}:${endMin}`;

  return { start, end };
};
