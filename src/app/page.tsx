"use client";

import { HourList } from "@/app/components/HourList";
import StoreProvider from "@/app/components/ReduxProvider";
import { UserBlock } from "./components/UserBlock";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-white">
      <StoreProvider>
        <UserBlock />
        <HourList />
      </StoreProvider>
    </main>
  );
}
