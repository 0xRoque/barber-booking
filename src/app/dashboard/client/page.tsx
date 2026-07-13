import { signOut, auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link"

export default async function ClientDashboard() {
  const barbers = await prisma.user.findMany({ where: { role: "BARBER" } });

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#1C1C1E]">
      <header className="bg-white dark:bg-[#2C2C2E] border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Escolhe o teu barbeiro</h1>
        <form action={async () => { "use server"; await signOut(); }}>
          <button type="submit" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sair
          </button>
        </form>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 gap-4">
          {barbers.map((barber) => (
            <Link href={`/dashboard/client/${barber.id}`} key={barber.id}>
              <div className="bg-white dark:bg-[#2C2C2E] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900 flex items-center justify-center text-violet-600 dark:text-violet-300 text-lg font-semibold">
                  {barber.name?.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{barber.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Barbeiro</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
