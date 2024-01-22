import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { setEvent } from "@/app/redux/events/eventsSlice";
import { HOUR_ITEM_HEIGHT } from "@/app/data/time";

export function HourItem({
  setModalIsOpen,
  time,
}: {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  time: string;
}) {
  const dispatch = useDispatch();

  const addEvent = (time: string) => {
    console.log("time: ", time);
    setModalIsOpen(true);
    dispatch(setEvent(time));
  };
  return (
    <div
      style={{ height: HOUR_ITEM_HEIGHT + "px" }}
      className={`flex hover:bg-[#c8d2fa] border-solid border-border border-b-2`}
      onClick={() => addEvent(time)}
    ></div>
  );
}
