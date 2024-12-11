import { useState } from 'react';
import Calendar from 'react-calendar';

const dates=[[],[],[],[],[]]
export function EventCalendar() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      {/* <Calendar onChange={onChange} value={value} /> */}
    </div>
  );
}

