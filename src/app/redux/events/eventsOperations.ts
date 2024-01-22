import { API } from "@/app/helpers/API/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getEvents = createAsyncThunk("getEvents", async () => {
  try {
    const { body }: { body: IEvent[] } = await API.getEvents().then((data) =>
      data?.json()
    );
    return body;
  } catch (error) {
    console.log("error: ", error);
  }
});

const postEvent = createAsyncThunk(
  "postEvent",
  async (data: IEvent, { rejectWithValue }) => {
    try {
      const { body } = await API.postEvent(data).then((data) => data?.json());
      return body;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const updateEvent = createAsyncThunk(
  "updateEvent",
  async (data: IEvent, { rejectWithValue }) => {
    try {
      const { body } = await API.updateEvent(data).then((data) => data?.json());
      return body;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const deleteEvent = createAsyncThunk(
  "deleteEvent",
  async (id: string, { rejectWithValue }) => {
    try {
      const { body } = await API.deleteEvent(id).then((data) => data?.json());
      return body;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export { getEvents, postEvent, updateEvent, deleteEvent };
