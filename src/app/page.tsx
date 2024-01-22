"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "./redux/store";
import { HourList } from "./components/HourList";

export default function Home() {
  return (
    <main className="flex min-h-screen pl-[400px] bg-white">
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <HourList />
        </PersistGate>
      </Provider>
    </main>
  );
}
