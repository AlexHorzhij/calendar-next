const os = require("os");
const path = require("path");

import { existsSync, mkdirSync, writeFileSync } from "fs";

export const saveEventsIntoFile = (events: IEvent[]) => {
  const id = events[0].user_id;
  const eventData = events.map((item) => {
    const { _id, user_id, ...rest } = JSON.parse(JSON.stringify(item));
    return rest;
  });
  const tempDir = os.tmpdir();
  console.log("tempDir: ", tempDir);
  const jsonDir = path.join(tempDir, "json");

  if (!existsSync(jsonDir)) {
    mkdirSync(jsonDir);
  }
  writeFileSync(`${jsonDir}/events_${id}.json`, JSON.stringify(eventData));
};
