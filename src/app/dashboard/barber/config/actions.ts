"use server"
import { prisma } from "@/lib/prisma"

export async function addDayOff(barberId: string, dayOfWeek: number){
    await prisma.dayOff.create({
        data: {barberId, dayOfWeek}
    })
}

export async function removeDayOff(barberId: string, dayOfWeek: number){
    await prisma.dayOff.deleteMany({
        where: {barberId, dayOfWeek}
    })
}