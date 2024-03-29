import { createSlice } from '@reduxjs/toolkit';
import {
  deleteEvent,
  getEvents,
  postEvent,
  updateEvent,
} from './eventsOperations';

const initialState = {
  events: [] as IEvent[],
  isLoading: false,
  error: null as string | null,
  newEventStart: null as null | string,
  currentEvent: null as null | IEvent,
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvent: (state, { payload }) => {
      state.currentEvent = null;
      state.newEventStart = payload;
    },
    setCurrentEvent: (state, { payload }: { payload: IEvent }) => {
      state.newEventStart = null;
      state.currentEvent = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getEvents.pending, state => {
        state.isLoading = true;
      })
      .addCase(getEvents.fulfilled, (state, { payload }) => {
        state.events = payload || [];
        state.isLoading = false;
      })
      .addCase(getEvents.rejected, (state, { payload }: { payload: any }) => {
        state.error = payload.message;
        state.isLoading = false;
      })
      .addCase(postEvent.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        postEvent.fulfilled,
        (state, { payload }: { payload: IEvent }) => {
          state.events.push(payload);
          state.isLoading = false;
        }
      )
      .addCase(postEvent.rejected, (state, { payload }: { payload: any }) => {
        state.error = payload.message;
        state.isLoading = false;
      })
      .addCase(updateEvent.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        updateEvent.fulfilled,
        (state, { payload }: { payload: IEvent }) => {
          const index = state.events.findIndex(
            item => item._id === payload._id
          );
          state.events[index] = payload;
          state.isLoading = false;
        }
      )
      .addCase(updateEvent.rejected, (state, { payload }: { payload: any }) => {
        state.error = payload.message;
        state.isLoading = false;
      })
      .addCase(deleteEvent.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        deleteEvent.fulfilled,
        (state, { payload }: { payload: IEvent }) => {
          state.events = state.events.filter(
            event => event._id !== payload._id
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
