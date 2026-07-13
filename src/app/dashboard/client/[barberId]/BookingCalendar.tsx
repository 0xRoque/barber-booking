"use client"

import {useState, useEffect} from "react"
import {DayPicker} from "react-day-picker"
import "react-day-picker/dist/style.css"
import { getBlockedSlots } from "./actions"

export default function BookingCalendar({slots, barberId, }:{slots: string[], barberId: string }){

    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [blockedSlots, setBlockedSlots] = useState<string[]>([])


    useEffect(()=> {
        if(!selectedDate) return 
        getBlockedSlots(barberId, selectedDate.toISOString().split("T")[0])
        .then((slots)=> setBlockedSlots(slots.map((s)=> s.startTime)))
    }, [selectedDate])

    useEffect(()=>{
    setSelectedDate(new Date())},[])

    if(!selectedDate) return null

    return(<div>
                <DayPicker 
                mode="single"
                selected = {selectedDate}
                onSelect = {(date)=> date && setSelectedDate(date)}
                captionLayout = "dropdown"/>
                
                <div>
                    {slots.map((slot)=>(
                       <button 
                            key={slot}
                            disabled={blockedSlots.includes(slot)}
                            className={blockedSlots.includes(slot) ? "bg-red-500 text-white" : "bg-gray-200 text-black"}>
                            {slot}
                         </button>
                    ))}
                </div>
                

    </div>)

    

}

