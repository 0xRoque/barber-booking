"use client";
import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { blockSlot, getBlockedSlots, unblockSlot} from "./actions"

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
    <div>
      <h2>Slots</h2>
      <div>
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          captionLayout="dropdown"
        />
      </div>
      <div id="slotsGrid" className="grid grid-cols-2 gap-2">
        {slots.map((slot) => (
          <div
            key={slot}
            onClick={() =>{if (blockedSlots.includes(slot)){
              unblockSlot(barberId, selectedDate.toISOString().split("T")[0],slot)
              .then(()=> setBlockedSlots(blockedSlots.filter((s) => s !== slot)))
            }else{
              setSelectedSlot(slot)
            }} }
            className={`p-2 text-center border rounded cursor-pointer ${blockedSlots.includes(slot) ? "bg-red-400 text-white" : "hover:bg-gray-100"}`}
          >
            {slot}
          </div>
        ))}
        {selectedSlot && (
          <div>
            <p>Slot: {selectedSlot}</p>
            <button onClick={() => blockSlot(barberId, selectedDate.toISOString().split("T")[0], selectedSlot, "lunch")
            .then(()=>{ setBlockedSlots([...blockedSlots,selectedSlot])
              setSelectedSlot(null)})}>Almoço</button>
            <button onClick={() => blockSlot(barberId, selectedDate.toISOString().split("T")[0], selectedSlot, "reservation")}>Marcado</button>
            <button onClick={() => blockSlot(barberId, selectedDate.toISOString().split("T")[0], selectedSlot, "dayOff")}>Folga</button>
          </div>
        )}
      </div>
    </div>
  );
}
