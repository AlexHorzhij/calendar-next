import { createSlice } from "@reduxjs/toolkit";
import {
  deleteEvent,
  getEvents,
  postEvent,
  updateEvent,
} from "./eventsOperations";

const initialState = {
  events: [] as IEvent[],
  isLoading: false,
  error: null as string | null,
  newEventStart: null as null | string,
  currentEvent: null as null | IEvent,
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvent: (state, { payload }) => {
      console.log("payloadsetEvent: ", payload);
      // state.currentEvent = null;
      // console.log("state: ", state);
      return { ...state, newEventStart: payload };

      // state.newEventStart = payload;
    },
    setCurrentEvent: (state, { payload }: { payload: IEvent }) => {
      console.log("payloadsetCurrentEvent: ", payload);
      return { ...state, newEventStart: null };
      // state.currentEvent = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEvents.fulfilled, (state, { payload }) => {
        console.log("payload getEvents: ", payload);
        state.events = payload || [];
        state.isLoading = false;
        console.log("state: fulfilled", state);
      })
      .addCase(getEvents.rejected, (state, { payload }) => {
        // state.error = payload
        state.isLoading = false;
      })
      .addCase(postEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        postEvent.fulfilled,
        (state, { payload }: { payload: IEvent }) => {
          console.log("payload: ", payload);
          state.events.push(payload);
          state.isLoading = false;
        }
      )
      .addCase(postEvent.rejected, (state, { payload }) => {
        console.log("payload: ", payload);
        state.isLoading = false;
      })
      .addCase(updateEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateEvent.fulfilled,
        (state, { payload }: { payload: IEvent }) => {
          const index = state.events.findIndex(
            (item) => item._id === payload._id
          );
          state.events[index] = payload;
          state.isLoading = false;
        }
      )
      .addCase(updateEvent.rejected, (state, { payload }) => {
        console.log("payload: ", payload);
        state.isLoading = false;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteEvent.fulfilled,
        (state, { payload }: { payload: IEvent }) => {
          state.events = state.events.filter(
            (event) => event._id !== payload._id
          );
          state.isLoading = false;
        }
      )
      .addCase(deleteEvent.rejected, (state, { payload }: { payload: any }) => {
        state.error = payload.message;
        state.isLoading = false;
      });
  },
});

export const { setEvent, setCurrentEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
