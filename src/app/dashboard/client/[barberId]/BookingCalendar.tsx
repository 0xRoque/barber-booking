"use client"

import {useState, useEffect} from "react"
import {DayPicker} from "react-day-picker"
import "react-day-picker/dist/style.css"

export default function BookingCalendar({slots, barberId, blockedSlots}:{slots: string[], barberId: string, blockedSlots: string[] }){

    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    useEffect(()=>{
    setSelectedDate(new Date())},[])

    if(!selectedDate) return null

    return(<div>
                <DayPicker 
                mode="single"
                selected = {selectedDate}
                onSelect = {(date)=> date && setSelectedDate(date)}
                captionLayout = "dropdown"/>

    </div>)

    

}

