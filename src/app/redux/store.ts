// import { configureStore } from "@reduxjs/toolkit";
// import {
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
//   persistReducer,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import { eventsSlice } from "./events/eventsSlice";
// console.log("eventsSlice: ", eventsSlice);
// // import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// // export default storage;

// const persistConfig = {
//   key: "events",
//   storage: storage,
//   whitelist: ["events"],
// };

// const persistedReducer = persistReducer(persistConfig, eventsSlice.reducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });
// console.log("store123: ", store);

// export const persistor = persistStore(store);

// interface StorageInterface {
//   getItem(key: string): Promise<string | null>;
//   setItem(key: string, value: string): Promise<void>;
//   removeItem(key: string): Promise<void>;
// }

// const createNoopStorage = (): StorageInterface => {
//   return {
//     getItem(_key: string): Promise<string | null> {
//       return Promise.resolve(null);
//     },
//     setItem(_key: string, value: string): Promise<void> {
//       return Promise.resolve();
//     },
//     removeItem(_key: string): Promise<void> {
//       return Promise.resolve();
//     },
//   };
// };

// const storage: StorageInterface =
//   typeof window !== "undefined"
//     ? createWebStorage("events")
//     : createNoopStorage();
// console.log("storage: ", storage);

import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import eventReducers from "./events/eventsSlice";
console.log("eventReducers: ", eventReducers);

const persistConfig = {
  key: "event",
  storage: storage,
  whitelist: ["events"],
};

const persistedReducer = persistReducer(persistConfig, eventReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
