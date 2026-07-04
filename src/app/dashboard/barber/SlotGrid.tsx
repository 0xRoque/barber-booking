"use client";
import { useState, useEffect } from "react";

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
        <button onClick={() => {
          const prev = new Date(selectedDate);
          prev.setDate(prev.getDate() - 1);
          setSelectedDate(prev);
        }}> ←Anterior</button>

        <span> {selectedDate.toLocaleDateString("pt-PT")} </span>

        <button onClick={() => {
          const next = new Date(selectedDate);
          next.setDate(next.getDate() + 1);
          setSelectedDate(next);
        }}>Seguinte →</button>
      </div>

      <div id="slotsGrid">
        {slots.map((slot) => (
          <div key={slot}>{slot}</div>
        ))}
      </div>
    </div>
  );
}
