"use client";
import { useState } from "react";
import { addDayOff, removeDayOff } from "./actions";

export default function DayOffPicker({
  barberId,
  initialDaysOff,
}: {
  barberId: string;
  initialDaysOff: number[];
}) {
  const [daysOff, setDaysOff] = useState<number[]>(initialDaysOff);
  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  function toggleDay(day: number) {
    if (daysOff.includes(day)) {
      removeDayOff(barberId, day);
      setDaysOff(daysOff.filter((d) => d !== day));
    } else {
      addDayOff(barberId, day);
      setDaysOff([...daysOff, day]);
    }
  }

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day, index) => (
        <button
          key={index}
          onClick={() => toggleDay(index)}
          className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
            daysOff.includes(index)
              ? "bg-red-500 text-white border border-red-600"
              : "bg-gray-50 dark:bg-[#3A3A3C] text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#48484A]"
          }`}
        >
          {day}
        </button>
      ))}
    </div>
  );
}
