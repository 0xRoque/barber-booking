"use server"

import { prisma } from "@/lib/prisma"


export async function blockSlot(barberId: string, date: string, startTime: string, status: string){
    await prisma.slot.create({
        data: {
            barberId, 
            date, 
            startTime,
            status,
        }
    })
}

