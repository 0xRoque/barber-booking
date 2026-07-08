"use client"
import {useState} from "react"
import { addDayOff, removeDayOff } from "./actions"



export default function DayOffPicker({barberId,initialDaysOff }:{barberId: string, initialDaysOff: number[]}){
    const[daysOff, setDaysOff] = useState<number[]>(initialDaysOff)
    const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

    function toggleDay(day:number){
        if(daysOff.includes(day)) {
            removeDayOff(barberId,day)
            setDaysOff(daysOff.filter((d)=> d !== day))
        }else{
            addDayOff(barberId, day)
            setDaysOff([...daysOff, day])
        }
    }

    return(<div>
            {days.map((day, index)=>(
                <button key={index} onClick={()=> toggleDay(index)}className={daysOff.includes(index) ? "bg-red-500 text-white" : "bg-gray-200 text-black"}>
                    {day}
                    </button>
            ))}
        </div>
        )

}