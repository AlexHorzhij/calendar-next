import { Dispatch, SetStateAction } from "react";
import { EventForm } from "./EventForm";

export function Modal({
  setModalIsOpen,
}: {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="absolute z-20 w-[400px] p-10 bg-white left-0 top-0 ">
      <EventForm setModalIsOpen={setModalIsOpen} />
    </div>
  );
}
