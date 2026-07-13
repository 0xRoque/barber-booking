import {prisma} from "@/lib/prisma"
import BookingCalendar from "./BookingCalendar"


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

export default async function BarberPage({params} : {params: Promise<{barberId: string}>}){

    const {barberId} = await params
    const barber = await prisma.user.findUnique({where: {id:barberId}})
    const config = await prisma.barberConfig.findUnique({where: {barberId}})

    const slots = generateSlots(config?.weekdayStart ?? "08:00", config?.weekdayEnd ?? "20:00")

    return (
        <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#1C1C1E]">
            <header className="bg-white dark:bg-[#2C2C2E] border-b border-gray-200 dark:border-gray-800 px-6 py-4">
                <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">Barbeiro</p>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{barber?.name}</h1>
                </div>
            </header>
            <main className="max-w-4xl mx-auto px-6 py-8">
                <BookingCalendar slots={slots} barberId={barberId}/>
            </main>
        </div>
    )
}