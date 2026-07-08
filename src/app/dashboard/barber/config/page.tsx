import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import DayOffPicker from "./DayOffPicker"

export default async function schedule() {
  const session = await auth()
  const barberId = session?.user?.id as string
  const daysOff = await prisma.dayOff.findMany({ where: { barberId } })
  return (
    <div>
      <h1>Configuration</h1>
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
            data: {
              barberId: barberId,
              weekdayStart: weekdayStart,
              weekdayEnd: weekdayEnd,
              weekendStart: weekendStart,
              weekendEnd: weekendEnd,
            },
          });
        }}
      >
        <label htmlFor="weekdayStart">Hórario entrada dias de semana (Seg-Sex)</label>
        <input id="weekdayStart" name="weekdayStart" type="time"></input>

        <label htmlFor="weekdayEnd">Hórario saída dias de semana (Seg-Sex)</label>
        <input id="weekdayEnd" name="weekdayEnd" type="time"></input>

        <label htmlFor="weekendStart">Hórario entras Fim de semana</label>
        <input id="weekendStart" name="weekendStart" type="time"></input>

        <label htmlFor="weekendEnd">Hórario de saída Fim de semana</label>
        <input id="weekendEnd" name="weekendEnd" type="time"></input>

        <button type="submit">Enviar</button>
      </form>
      <DayOffPicker barberId={barberId} initialDaysOff={daysOff.map((d) => d.dayOfWeek)}/>
    </div>
  );
}
