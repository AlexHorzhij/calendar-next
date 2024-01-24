const BASE_URL = "https://alexhorzhij.github.io/calendar-next";

export const API = {
  getEvents: async (id: string) => {
    try {
      const events = await fetch(`${BASE_URL}/api/events`, {
        headers: {
          user: id,
        },
      });
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
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      return response;
    } catch (error) {
      console.error("error: ", error);
    }
  },
  register: async (credentials: IUser) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      return response;
    } catch (error) {
      console.error("error1: ", error);
    }
  },
};
