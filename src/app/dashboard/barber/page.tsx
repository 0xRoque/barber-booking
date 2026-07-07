import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SlotGrid from "./SlotGrid"

function generateSlots(start: string, end: string) {
  const slots: string[] = [];

  const convertStartTime = start.split(":");
  const startMinut =
    parseInt(convertStartTime[0]) * 60 + parseInt(convertStartTime[1]);
  const convertEndTime = end.split(":");
  const endMinut =
    parseInt(convertEndTime[0]) * 60 + parseInt(convertEndTime[1]);

  for (let i = startMinut; i < endMinut; i += 30) {
    const hours = String(Math.floor(i / 60)).padStart(2, "0");
    const minut = String(i % 60).padStart(2, "0");
    const time = `${hours}:${minut}`;
    slots.push(time);
  }
  return slots;
}

export default async function BarberDashboard() {
  const session = await auth();
  const barberId = session?.user?.id as string;

  const config = await prisma.barberConfig.findUnique({
    where: { barberId: barberId },
  });
  const slots = generateSlots(
    config?.weekdayStart ?? "08:00",
    config?.weekdayEnd ?? "20:00",
  );
  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#1C1C1E]">
      <header className="bg-white dark:bg-[#2C2C2E] border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">Bem-vindo</p>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{session?.user?.name}</h1>
        </div>
        <form action={async () => { "use server"; await signOut(); }}>
          <button type="submit" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sair
          </button>
        </form>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-8">
        <SlotGrid slots={slots} barberId={barberId}/>
      </main>
    </div>
  );
}
