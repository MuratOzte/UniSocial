import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import Loading from "../common/Loading";
import { useEvents } from "@/hooks/useFetchEvents";
import { useSelector } from "react-redux";

const EventsList = () => {
  const eventsRedux = useSelector((state) => state.feed);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { events = [], isValidating, error } = useEvents();

  useEffect(() => {
    if (!events || events.length === 0) return; 

    if (eventsRedux.SelectedCalendarDate) {
      const temp = events.filter((e) => e.date === eventsRedux.SelectedCalendarDate);
      setFilteredEvents(temp);
    } else {
      setFilteredEvents(events); 
    }
  }, [events, eventsRedux.SelectedCalendarDate]);

  if (isValidating) {
    return (
      <div className="flex justify-center items-center mt-16">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(filteredEvents)

  return (
    <div className="p-6 space-y-4">
      {filteredEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsList;
