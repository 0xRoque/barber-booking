"use client";
import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { blockSlot } from "./actions"

export default function SlotGrid({ slots,barberId }: { slots: string[],barberId: string }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

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
      <div id="slotsGrid">
        {slots.map((slot) => (
          <div key={slot} onClick={() => setSelectedSlot(slot)}>{slot}</div>
        ))}
        {selectedSlot && (
          <div>
            <p>Slot: {selectedSlot}</p>
            <button onClick={() => blockSlot(barberId, selectedDate.toISOString().split("T")[0], selectedSlot, "lunch")}>Almoço</button>
            <button onClick={() => blockSlot(barberId, selectedDate.toISOString().split("T")[0], selectedSlot, "reservation")}>Marcado</button>
            <button onClick={() => blockSlot(barberId, selectedDate.toISOString().split("T")[0], selectedSlot, "dayOff")}>Folga</button>
          </div>
        )}
      </div>
    </div>
  );
}
