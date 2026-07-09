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

    return(<div>

        <h1>{barber?.name}</h1>
        <BookingCalendar slots={slots} barberId= {barberId} blockedSlots={[]}/>
    </div>)
}