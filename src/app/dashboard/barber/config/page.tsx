import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import DayOffPicker from "./DayOffPicker"

export default async function schedule() {
  const session = await auth()
  const barberId = session?.user?.id as string
  const daysOff = await prisma.dayOff.findMany({ where: { barberId } })
  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#1C1C1E]">
      <header className="bg-white dark:bg-[#2C2C2E] border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Configuração</h1>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-6">

        <div className="bg-white dark:bg-[#2C2C2E] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-5">Horário de trabalho</h2>
          <form
            action={async (formData) => {
              "use server";
              const session = await auth();
              const barberId = session?.user?.id as string
              const weekdayStart = formData.get("weekdayStart") as string;
              const weekdayEnd = formData.get("weekdayEnd") as string;
              const weekendStart = formData.get("weekendStart") as string;
              const weekendEnd = formData.get("weekendEnd") as string;

              await prisma.barberConfig.create({
                data: { barberId, weekdayStart, weekdayEnd, weekendStart, weekendEnd },
              });
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="weekdayStart" className="text-sm text-gray-500 dark:text-gray-400">Entrada Seg–Sex</label>
                <input id="weekdayStart" name="weekdayStart" type="time" className="bg-gray-50 dark:bg-[#3A3A3C] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-violet-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="weekdayEnd" className="text-sm text-gray-500 dark:text-gray-400">Saída Seg–Sex</label>
                <input id="weekdayEnd" name="weekdayEnd" type="time" className="bg-gray-50 dark:bg-[#3A3A3C] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-violet-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="weekendStart" className="text-sm text-gray-500 dark:text-gray-400">Entrada Fim de semana</label>
                <input id="weekendStart" name="weekendStart" type="time" className="bg-gray-50 dark:bg-[#3A3A3C] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-violet-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="weekendEnd" className="text-sm text-gray-500 dark:text-gray-400">Saída Fim de semana</label>
                <input id="weekendEnd" name="weekendEnd" type="time" className="bg-gray-50 dark:bg-[#3A3A3C] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-violet-500" />
              </div>
            </div>
            <button type="submit" className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-colors">
              Guardar horário
            </button>
          </form>
        </div>

        <div className="bg-white dark:bg-[#2C2C2E] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-5">Dias de folga</h2>
          <DayOffPicker barberId={barberId} initialDaysOff={daysOff.map((d) => d.dayOfWeek)}/>
        </div>

      </main>
    </div>
  );
}
