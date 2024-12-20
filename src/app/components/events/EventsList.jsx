import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import Loading from "../common/Loading";
import { useEvents } from "@/hooks/useFetchEvents";
import { useDispatch, useSelector } from "react-redux";
import feedSlice from "@/store/Slices/FeedSlice";

const EventsList = () => {
  const dispatch = useDispatch();
  const eventsRedux = useSelector((state) => state.feed);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { events = [], isValidating, error } = useEvents();

  useEffect(() => {
    if (!events || events.length === 0) return;

    if (eventsRedux.SelectedCalendarDate) {
      const temp = events.filter(
        (e) => e.date === eventsRedux.SelectedCalendarDate
      );
      setFilteredEvents(temp);
    } else {
      setFilteredEvents(events);
    }
  }, [events, eventsRedux.SelectedCalendarDate]);
  useEffect(() => {
    events.map((e) => dispatch(feedSlice.actions.setSharedEventsDate(e.date)));
  }, [events]);

  if (isValidating) {
    return (
      <div className="flex justify-center items-center mt-16">
        <Loading />
      </div>
    );
  }
  if(filteredEvents.length==0){
    return(
      <p
      className="text-gray-200 text-xl bg-gray-500 px-4 py-2 rounded-md" 
      >Bugun hiç event yok</p>
    )
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-6 space-y-4">
      {filteredEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsList;
