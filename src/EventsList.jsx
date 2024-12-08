import styled from "styled-components";
import EventCard from "./EventCard";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => theme.colors.secondary};

  @media (max-width: 320px) {
    padding: ${({ theme }) => theme.spacing(1)};  
    gap: ${({ theme }) => theme.spacing(1)};  
  }

  @media (min-width: 768px) {
    justify-content: space-evenly;  
  }

  @media (min-width: 1024px) {
    gap: ${({ theme }) => theme.spacing(3)};  
  }
`;

const EventsList = ({ events, onEventClick }) => (
  <Container>
    {events.map((event) => (
      <EventCard
        key={event.id}
        event={{
          ...event,
          description: event.description || "No description available",
        }}
        onClick={() => onEventClick(event.id)}
      />
    ))}
  </Container>
);

EventsList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  onEventClick: PropTypes.func.isRequired,
};

export default EventsList;
