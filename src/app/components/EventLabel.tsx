"use client";

import { Dispatch, SetStateAction, useRef } from "react";
import { useDispatch } from "react-redux";

import { setCurrentEvent } from "@/app/redux/events/eventsSlice";
import { calculateEventPosition } from "@/app/helpers";
import { HOUR_ITEM_HEIGHT } from "../data/time";

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
  const ref = useRef<HTMLDivElement | null>(null);
  const labelWidth = ref.current?.offsetWidth!;

  const dispatch = useDispatch();

  const startTime = Number(event.start);
  const position = calculateEventPosition(startTime);

  const openEventUpdateModal = (event: IEvent) => {
    dispatch(setCurrentEvent(event));
    setModalIsOpen(true);
  };

  return (
    <div
      ref={ref}
      style={{
        top: `${position}px`,
        height: `${(event.duration / 60) * HOUR_ITEM_HEIGHT}px`,
        left: `${direction === 0 ? 0 : "50%"}`,
        width: `${labelWidth < 200 ? width : "200px"}`,
      }}
      className={`truncate ... absolute cursor-pointer text-sm font-normal py-1 px-4 bg-background pointer-events-auto border-l-border border-solid border-4 hover:bg-blue-300 z-[${
        index + 20
      }]`}
      onClick={() => openEventUpdateModal(event)}
    >
      {event.title}
    </div>
  );
}
