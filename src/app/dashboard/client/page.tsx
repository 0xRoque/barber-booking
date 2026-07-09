import { signOut, auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link"

export default async function ClientDashboard() {
  const barbers = await prisma.user.findMany({ where: { role: "BARBER" } });

  return (
    <div className="div">
      <h1>Client Dashbord</h1>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>

      {barbers.map((barber) => (
        <Link href={`/dashboard/client/${barber.id}`} key={barber.id}>
          <p>{barber.name}</p>
        </Link>
      ))}
    </div>
  );
}
