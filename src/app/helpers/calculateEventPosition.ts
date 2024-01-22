import { HOUR_ITEM_HEIGHT, START_TIME_TABLE } from "@/app/data/time";

export const calculateEventPosition = (minutes: number) => {
  const minutesInPixels = HOUR_ITEM_HEIGHT / 60;
  const topEventPosition = (minutes - START_TIME_TABLE) * minutesInPixels;

  return topEventPosition;
};
