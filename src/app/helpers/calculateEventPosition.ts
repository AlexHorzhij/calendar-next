import { HOUR_ITEM_HEIGHT } from '@/app/data/time';

export const calculateEventPosition = (minutes: number) => {
  const minutesInPixels = HOUR_ITEM_HEIGHT / 60;
  const topEventPosition = minutes * minutesInPixels;

  return topEventPosition;
};
