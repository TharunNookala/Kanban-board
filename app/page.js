import Login from "@/components/Login";

export default function Home() {
  return (
    <main className="flex w-screen h-screen flex-col items-center gap-10">
      <h1 className="text-sm w-full text-center sm:text-3xl sm:font-bold mt-10">
        Welcome to Kanban Board
      </h1>
      <Login />
    </main>
  );
}
