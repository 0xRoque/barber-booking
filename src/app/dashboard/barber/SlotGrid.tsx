"use client";
import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

export default function SlotGrid({ slots }: { slots: string[] }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
          <div key={slot}>{slot}</div>
        ))}
      </div>
    </div>
  );
}
