"use server"

import {prisma} from "@/lib/prisma"

export async function getBlockedSlots(barberId: string, date: string){
    return await prisma.slot.findMany({
        where: {barberId, date}
    })
}