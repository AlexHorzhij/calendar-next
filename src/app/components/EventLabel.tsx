import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import MultiClamp from "react-multi-clamp";
import { setCurrentEvent } from "@/app/redux/events/eventsSlice";
import { calculateEventPosition } from "@/app/helpers/calculateEventPosition";

export function EventLabel({
  event,
  index,
  direction,
  width,
  setModalIsOpen,
}: {
  index: number;
  event: IEvent;
  direction: number;
  width: string;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch();

  const startTime = Number(event.start);
  const position = calculateEventPosition(startTime);

  const openEventUpdateModal = (event: IEvent) => {
    console.log("event: ", event);
    setModalIsOpen(true);
    // dispatch(setCurrentEvent(event));
  };

  return (
    <div
      style={{
        top: `${position}px`,
        height: `${event.duration}px`,
        left: `${direction === 0 ? 0 : "50%"}`,
        width: `${width}`,
      }}
      className={`absolute text-sm font-normal py-1 px-4 bg-background pointer-events-auto border-l-border border-solid border-4 hover:bg-blue-300 z-[${
        index + 20
      }]`}
      onClick={() => openEventUpdateModal(event)}
    >
      <MultiClamp>{event.title}</MultiClamp>
    </div>
  );
}
