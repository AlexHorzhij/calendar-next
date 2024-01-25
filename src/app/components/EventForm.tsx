"use client";

import React, { useEffect, Dispatch, SetStateAction, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useFormik } from "formik";

import { convertMinutesToHourAndMinutes } from "@/app/helpers";
import { eventStart, currentEvent } from "@/app/redux/events/eventsSelectors";
import { userId } from "@/app/redux/user/userSelectors";
import { eventValidation } from "../db/schemas/events/eventValidation";
import {
  deleteEvent,
  postEvent,
  updateEvent,
} from "@/app/redux/events/eventsOperations";
import { START_TIME_TABLE } from "../data/time";

export function EventForm({
  setModalIsOpen,
}: {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch<ThunkDispatch<IEvent, any, any>>();

  const user_id = useSelector(userId);
  const newEventStartTime: string | null = useSelector(eventStart);
  const currentEventForUpdating: IEvent | null = useSelector(currentEvent);

  const { start, end } = convertMinutesToHourAndMinutes(
    currentEventForUpdating
  );

  let startTime = null as null | string;
  if (newEventStartTime) {
    startTime = Number.parseInt(newEventStartTime).toString().padStart(2, "0");
  }

  const formik = useFormik({
    initialValues: {
      start: startTime ? `${startTime}:00` : start,
      end: startTime ? `${startTime}:30` : end,
      title: currentEventForUpdating?.title || "",
    },
    validationSchema: eventValidation,
    onSubmit: (values) => {
      const startTimeArr = values.start.split(":");
      const startMinutes =
        Number(startTimeArr[0]) * 60 -
        START_TIME_TABLE +
        Number(startTimeArr[1]);
      const endTimeArr = values.end.split(":");
      const endMinutes =
        Number(endTimeArr[0]) * 60 - START_TIME_TABLE + Number(endTimeArr[1]);

      const duration = endMinutes - startMinutes;

      const data: IEvent = {
        start: Number(startMinutes),
        duration,
        title: values.title,
        user_id,
      };

      if (startTime) {
        dispatch(postEvent(data));
      } else if (currentEventForUpdating) {
        dispatch(updateEvent({ ...data, _id: currentEventForUpdating._id }));
      }

      setModalIsOpen(false);
    },
  });

  const onDelete = async (id: string) => {
    dispatch(deleteEvent(id));
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (currentEventForUpdating) {
      formik.setFieldValue("start", start);
      formik.setFieldValue("end", end);
      formik.setFieldValue("title", currentEventForUpdating?.title);
    }
    if (newEventStartTime) {
      formik.setFieldValue("start", `${startTime}:00`);
      formik.setFieldValue("end", `${startTime}:30`);
      formik.setFieldValue("title", "");
    }
  }, [currentEventForUpdating, newEventStartTime, startTime, start, end]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-6 items-stretch"
    >
      <div className="w-full">
        <label htmlFor="title">Title</label>
        <textarea
          id="title"
          name="title"
          maxLength={100}
          rows={3}
          required
          autoFocus
          onChange={formik.handleChange}
          value={formik.values.title}
          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="flex gap-4 w-full items-stretch">
        <div className="w-full">
          <label htmlFor="start">Event start</label>
          <input
            id="start"
            name="start"
            type="time"
            min="08:00"
            max="17:00"
            required
            onChange={formik.handleChange}
            value={formik.values.start}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="w-full">
          <label htmlFor="end">Event end</label>
          <input
            id="end"
            name="end"
            type="time"
            min="08:00"
            max="17:00"
            onChange={formik.handleChange}
            value={formik.values.end}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div className="flex">
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Save
        </button>
        <button
          type="button"
          className="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={() => setModalIsOpen(false)}
        >
          Cancel
        </button>
      </div>
      {currentEventForUpdating && (
        <button
          type="button"
          className="w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={() => onDelete(currentEventForUpdating._id!)}
        >
          Delete event
        </button>
      )}
    </form>
  );
}
