const BASE_URL = process.env.NEXT_PUBLIC_URL;

export const API = {
  getEvents: async () => {
    try {
      const events = await fetch(`${BASE_URL}/api/events`);
      return events;
    } catch (error) {
      console.error("error: ", error);
    }
  },
  postEvent: async (data: IEvent) => {
    try {
      const response = await fetch(`${BASE_URL}/api/events`, {
        method: "POST",
        body: JSON.stringify(data),
      });

      return response;
    } catch (error) {
      console.error("error: ", error);
    }
  },
  updateEvent: async (data: IEvent) => {
    try {
      const response = await fetch(`${BASE_URL}/api/events`, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      return response;
    } catch (error) {
      console.error("error: ", error);
    }
  },
  deleteEvent: async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/events`, {
        method: "DELETE",
        body: JSON.stringify(id),
      });

      return response;
    } catch (error) {
      console.error("error: ", error);
    }
  },
};
