import { RootState } from "@/app/redux/store";

export const eventStart = (state: RootState) => state.events.newEventStart;
export const allEvents = (state: RootState) => state.events.events;
export const currentEvent = (state: RootState) => state.events.currentEvent;
export const isLoading = (state: RootState) => state.events.isLoading;
