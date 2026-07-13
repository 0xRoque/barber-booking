"use server"

import {prisma} from "@/lib/prisma"

export async function getBlockedSlots(barberId: string, date: string){
    return await prisma.slot.findMany({
        where: {barberId, date}
    })
}

export async function createBooking(barberId: string, clientId: string, date: string, startTime: string){

    const slot = await prisma.slot.create({data: {barberId, date, startTime, status: "booked"}})
                await prisma.booking.create({data: {clientId, slotId: slot.id, status: "PENDING"}})
    

}