import styled from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: ${({ theme }) => theme.spacing(2)};
  margin: ${({ theme }) => theme.spacing(1)};
  flex-basis: calc(50% - 16px); 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(2)}; 

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }

  transition: transform 0.2s, box-shadow 0.2s;

  @media (max-width: 320px) {
    padding: ${({ theme }) => theme.spacing(1)};
    flex-basis: 100%; 
    gap: ${({ theme }) => theme.spacing(1)}; 
  }
`;

// Title
const Title = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  margin: 0 0 ${({ theme }) => theme.spacing(1)};
  
  @media (max-width: 320px) {
    font-size: 1rem; 
  }
`;

const Info = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  margin: ${({ theme }) => theme.spacing(0.5)} 0;

  @media (max-width: 320px) {
    font-size: 0.8rem; 
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing(1)};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.text};
  }

  @media (max-width: 320px) {
    font-size: 0.8rem; 
    padding: ${({ theme }) => theme.spacing(0.8)}; 
  }
`;

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <Card>
      <Title>{event.name}</Title>
      <Info>
        <strong>City:</strong> {event.city}
      </Info>
      <Info>
        <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
      </Info>
      <Info>
        <strong>Price:</strong> {event.price === 0 ? "Free" : `${event.price} SEK`}
      </Info>
      <Button onClick={handleDetailsClick}>View Details</Button>
    </Card>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default EventCard;
