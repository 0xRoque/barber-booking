"use client"

import { useState, useEffect } from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { getBlockedSlots, createBooking } from "./actions"
import { useSession } from "next-auth/react"

export default function BookingCalendar({ slots, barberId }: { slots: string[], barberId: string }) {

    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [blockedSlots, setBlockedSlots] = useState<string[]>([])
    const { data: session } = useSession()
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
    

    useEffect(() => {
        if (!selectedDate) return
        getBlockedSlots(barberId, selectedDate.toISOString().split("T")[0])
            .then((slots) => setBlockedSlots(slots.map((s) => s.startTime)))
    }, [selectedDate])

    useEffect(() => {
        setSelectedDate(new Date())
    }, [])

    if (!selectedDate) return null

    return (
        <div>
            <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                captionLayout="dropdown"
            />

            <div>
                {slots.map((slot) => (
                    <button
                        key={slot}
                        disabled={blockedSlots.includes(slot)}
                        className={blockedSlots.includes(slot) ? "bg-red-500 text-white" : "bg-gray-200 text-black"}
                     onClick={() => {
    if (blockedSlots.includes(slot)) return
    setSelectedSlot(slot)
}}
                    >
                        {slot}
                    </button>
                ))}
            </div>

            {selectedSlot && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-[#2C2C2E] rounded-2xl p-6 w-80 shadow-2xl">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Confirmar marcação</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{selectedSlot} · {selectedDate?.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long" })}</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setSelectedSlot(null)}
                                className="flex-1 py-2 rounded-xl text-sm font-medium bg-gray-100 dark:bg-[#3A3A3C] text-gray-700 dark:text-white"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    if (!session?.user?.id) return
                                    createBooking(barberId, session.user.id, selectedDate!.toISOString().split("T")[0], selectedSlot)
                                    setSelectedSlot(null)
                                    setBlockedSlots([...blockedSlots, selectedSlot])
                                }}
                                className="flex-1 py-2 rounded-xl text-sm font-medium bg-violet-600 text-white"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
