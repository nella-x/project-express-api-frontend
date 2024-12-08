import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.hover};
  }
`;

const Title = styled.h1`
  font-size: 1.2rem;
  margin: 0;
`;

const Navbar = ({ resetFilters }) => {
  const handleEventsClick = () => {
    resetFilters();
  };

  return (
    <NavContainer>
      <Title>Events for days!</Title>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/events" onClick={handleEventsClick}>Events</NavLink>
      </NavLinks>
    </NavContainer>
  );
};

Navbar.propTypes = {
  resetFilters: PropTypes.func.isRequired,
};

export default Navbar;
