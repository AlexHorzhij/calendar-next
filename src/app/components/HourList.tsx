"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";

import { isLoading, allEvents } from "@/app/redux/events/eventsSelectors";
import { getEvents } from "@/app/redux/events/eventsOperations";
import { HourItem } from "./HourItem";
import { Modal } from "./Modal";
import { EventLabel } from "./EventLabel";
import { timeList } from "@/app/data/time";
import { filterEvents } from "@/app/helpers";
import { Loader } from "@/app/components/Loader";
import { HoursLabel } from "./HoursLabel";
import { authorized, userId } from "@/app/redux/user/userSelectors";

export function HourList() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<IEvent, any, any>>();
  const user = useSelector(authorized);
  const userID = useSelector(userId);
  const events: IEvent[] = useSelector(allEvents);
  const loading = useSelector(isLoading);

  if (user) {
    router.push("/");
  } else {
    router.push("login");
  }

  const orderedEvents = [...events].sort((a, b) => a.start - b.start);
  const eventsList = filterEvents(orderedEvents);

  useEffect(() => {
    dispatch(getEvents(userID));
  }, [dispatch]);

  return (
    <>
      {loading && <Loader />}
      <div className="flex w-full">
        <div>
          {timeList.map((item) => (
            <HoursLabel text={item} key={item} />
          ))}
        </div>
        <div className="relative w-full">
          <div className="w-full shrink-0 grow absolute top-0 bottom-0 left-0 right-0 pointer-events-none">
            {eventsList.length > 0 &&
              eventsList.map((item, index) => {
                return (
                  <EventLabel
                    event={item}
                    index={index}
                    key={item._id}
                    direction={item.direction}
                    width={item.width}
                    setModalIsOpen={setModalIsOpen}
                  />
                );
              })}
          </div>
          <div className="border-solid border-border border-l-2">
            {timeList.map((item) => (
              <HourItem
                key={item}
                setModalIsOpen={setModalIsOpen}
                time={item}
              />
            ))}
          </div>
        </div>
        {modalIsOpen && <Modal setModalIsOpen={setModalIsOpen} />}
      </div>
    </>
  );
}
