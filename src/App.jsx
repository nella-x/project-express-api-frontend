import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import EventsList from "./EventsList";
import FilterBar from "./FilterBar";
import EventDetail from "./EventDetails";
import Navbar from "./Navbar";

const App = () => {
  const [events, setEvents] = useState([]); // Här lagras alla events
  const [filters, setFilters] = useState({ category: "", city: "", price: "" });

  const BASE_URL = "https://project-express-api-gep6.onrender.com";

  useEffect(() => {
    // Kontrollera om API-anropet fungerar korrekt
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${BASE_URL}/events`);
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        console.log("Fetched events:", data); // Logga datan för att se dess struktur
        setEvents(data); // Spara datan i state
      } catch (error) {
        console.error("Error fetching events:", error); // Logga om något går fel
      }
    };

    fetchEvents();
  }, []); // Tom dependency array för att endast köra vid mount

  // Filtrera events baserat på användarens val
  const filteredEvents = events.filter((event) => {
    const matchesCategory = filters.category
      ? event.category?.some((cat) => cat.toLowerCase() === filters.category.toLowerCase())
      : true;
    const matchesCity = filters.city
      ? event.city?.toLowerCase() === filters.city.toLowerCase()
      : true;
    const matchesPrice =
      filters.price === "Free"
        ? event.price === 0
        : filters.price === "Paid Entry"
          ? event.price > 0
          : true;

    return matchesCategory && matchesCity && matchesPrice;
  });

  const resetFilters = () => {
    setFilters({ category: "", city: "", price: "" }); // Återställ filter
  };

  const handleEventClick = (eventId) => {
    console.log(`Event ${eventId} clicked`); // Kontrollera om eventet klickas
  };

  return (
    <Router>
      <div>
        <Navbar resetFilters={resetFilters} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/events"
            element={
              <>
                <FilterBar setFilters={setFilters} />
                {filteredEvents.length > 0 ? ( // Rendera om data finns
                  <EventsList events={filteredEvents} onEventClick={handleEventClick} />
                ) : (
                  <p>No events found. Please adjust your filters.</p> // Hantera tom lista
                )}
              </>
            }
          />
          <Route path="/events/:id" element={<EventDetail events={events} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
