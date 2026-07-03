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
    <div className="div">
      <h1>Barber Dashbord</h1>

      <SlotGrid slots={slots} />

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
