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
        <div className="space-y-6">
            <div className="bg-white dark:bg-[#2C2C2E] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 flex justify-center">
                <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    captionLayout="dropdown"
                    className="!font-sans"
                />
            </div>

            <div className="bg-white dark:bg-[#2C2C2E] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
                    {selectedDate.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long" })}
                </h2>
                <div className="grid grid-cols-2 gap-2">
                    {slots.map((slot) => (
                        <button
                            key={slot}
                            disabled={blockedSlots.includes(slot)}
                            onClick={() => {
                                if (blockedSlots.includes(slot)) return
                                setSelectedSlot(slot)
                            }}
                            className={`py-3 text-center rounded-xl text-sm font-medium transition-all ${
                                blockedSlots.includes(slot)
                                    ? "bg-red-500 text-white border border-red-600 cursor-not-allowed"
                                    : "bg-gray-50 dark:bg-[#3A3A3C] text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#48484A] cursor-pointer"
                            }`}
                        >
                            {slot}
                        </button>
                    ))}
                </div>
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
