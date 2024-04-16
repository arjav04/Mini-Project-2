import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


export default function MyCalendar() {
  // const [value, onChange] = useState(new Date());
  const value = [new Date(2023, 10, 12), new Date(2023, 11, 11)]
  return (
    <div>
      <Calendar  defaultValue={Date()} value={value} />
      
    </div>
  );
}