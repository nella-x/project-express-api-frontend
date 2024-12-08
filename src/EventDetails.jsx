import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(3)};
`;

const DetailTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const DetailInfo = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  margin: ${({ theme }) => theme.spacing(1)} 0;
`;

const BackButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing(1)};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  &:hover {
    background-color: ${({ theme }) => theme.colors.text};
  }
`;

const EventDetail = ({ events }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Kontrollera om events är laddade
  if (!events.length) {
    return <p>Loading event details...</p>;
  }

  const event = events.find((event) => event.id === parseInt(id));

  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <DetailContainer>
      <BackButton onClick={() => navigate(-1)}>Go Back</BackButton>
      <DetailTitle>{event.name}</DetailTitle>
      <DetailInfo><strong>Venue:</strong> {event.venue}</DetailInfo>
      <DetailInfo><strong>City:</strong> {event.city}</DetailInfo>
      <DetailInfo><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</DetailInfo>
      <DetailInfo><strong>Time:</strong> {event.time}</DetailInfo>
      <DetailInfo><strong>Price:</strong> {event.price === 0 ? "Free" : `${event.price} SEK`}</DetailInfo>
      <DetailInfo><strong>Age Requirement:</strong> {event.age}+</DetailInfo>
    </DetailContainer>
  );
};

EventDetail.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      venue: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      age: PropTypes.number.isRequired,
    })
  ),
};

export default EventDetail;
