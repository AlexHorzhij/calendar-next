const calculateEnd = (event: any) => {
  return event.start + event.duration;
};

export const filterEvents = (events: IEvent[]) => {
  const newEventArr: any[] = [];

  for (let i = 0; i < events.length; i += 1) {
    const event: any = { ...events[i] };

    if (i === 0) {
      event.direction = 0;
      event.width = '100%';
    } else {
      if (
        newEventArr[i - 1].direction === 0 &&
        events[i].start <= calculateEnd(events[i - 1])
      ) {
        event.direction = 1;
        event.width = '50%';
        newEventArr[i - 1].width = '50%';
      } else {
        event.direction = 0;
        event.width = '100%';
      }
    }
    newEventArr.push(event);
  }
  return newEventArr;
};
