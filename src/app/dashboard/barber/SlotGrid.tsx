"use client";
import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { blockSlot, getBlockedSlots, unblockSlot } from "./actions"

export default function SlotGrid({ slots, barberId }: { slots: string[], barberId: string }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [blockedSlots, setBlockedSlots] = useState<string[]>([])

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  useEffect(() => {
    if (!selectedDate) return
    getBlockedSlots(barberId, selectedDate.toISOString().split("T")[0])
      .then((slots) => setBlockedSlots(slots.map((s) => s.startTime)))
  }, [selectedDate])

  if (!selectedDate) return null;

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
            <div key={slot} className="relative">
              <div
                onClick={() => {
                  if (blockedSlots.includes(slot)) {
                    unblockSlot(barberId, selectedDate.toISOString().split("T")[0], slot)
                      .then(() => setBlockedSlots(blockedSlots.filter((s) => s !== slot)))
                  } else {
                    setSelectedSlot(selectedSlot === slot ? null : slot)
                  }
                }}
                className={`py-3 text-center rounded-xl text-sm font-medium cursor-pointer transition-all ${
                  blockedSlots.includes(slot)
                    ? "bg-red-500 text-white border border-red-600"
                    : selectedSlot === slot
                    ? "bg-violet-600 text-white border border-violet-700 shadow-md shadow-violet-200"
                    : "bg-gray-50 dark:bg-[#3A3A3C] text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#48484A]"
                }`}
              >
                {slot}
              </div>
              {selectedSlot === slot && (
                <div className="absolute z-10 top-full mt-1 left-0 bg-white dark:bg-[#3A3A3C] rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-2 flex gap-1 w-max">
                  <button
                    onClick={() => blockSlot(barberId, selectedDate.toISOString().split("T")[0], selectedSlot, "lunch")
                      .then(() => { setBlockedSlots([...blockedSlots, selectedSlot]); setSelectedSlot(null) })}
                    className="px-3 py-1.5 bg-yellow-500 text-white rounded-lg text-xs font-medium hover:bg-yellow-600 transition-colors"
                  >Almoço</button>
                  <button
                    onClick={() => blockSlot(barberId, selectedDate.toISOString().split("T")[0], selectedSlot, "reservation")
                      .then(() => { setBlockedSlots([...blockedSlots, selectedSlot]); setSelectedSlot(null) })}
                    className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 transition-colors"
                  >Marcado</button>
                  <button
                    onClick={() => blockSlot(barberId, selectedDate.toISOString().split("T")[0], selectedSlot, "dayOff")
                      .then(() => { setBlockedSlots([...blockedSlots, selectedSlot]); setSelectedSlot(null) })}
                    className="px-3 py-1.5 bg-gray-500 text-white rounded-lg text-xs font-medium hover:bg-gray-600 transition-colors"
                  >Folga</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
