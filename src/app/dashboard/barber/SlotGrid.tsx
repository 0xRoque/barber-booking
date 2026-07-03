"use client";

export default function SlotGrid({ slots }: { slots: string[] }) {
  return (
    <div>
      <h2>Slots</h2>

      <div id="slotsGrid">
        {slots.map((slot) => (
          <div key={slot}>{slot}</div>
        ))}
      </div>
    </div>
  );
}
