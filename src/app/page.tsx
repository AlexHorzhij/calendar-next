import { HourList, UserBlock, StoreProvider } from "@/app/components";

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
