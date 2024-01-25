import { existsSync, mkdirSync, writeFileSync } from "fs";

export const saveEventsIntoFile = (events: IEvent[]) => {
  const id = events[0].user_id;
  const eventData = events.map((item) => {
    const { _id, user_id, ...rest } = JSON.parse(JSON.stringify(item));
    return rest;
  });
  if (!existsSync("./json")) {
    mkdirSync("./json");
  }
  writeFileSync(`./json/events_${id}.json`, JSON.stringify(eventData));
};
