import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import styled from "styled-components";
import bubbles from './assets/skybubbles.jpg';

const FilterContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  background-image: url(${bubbles});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Fieldset = styled.fieldset`
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  background-color: #f5f5f5b9;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(1)};
  align-items: center; 
  flex: 1;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.colors.primary};
  padding: 5px;
  border-radius: 4px;
  width: 100%;
`;

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  margin: ${({ theme }) => theme.spacing(0.5)} 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing(0.5)} 1rem;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: background-color 0.3s ease, color 0.3s ease;
  height: 40px; 

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primary};
  }

  input[type="radio"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.background};
    margin-right: ${({ theme }) => theme.spacing(1)};
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s ease, border 0.3s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.hover};
    }

    &:checked {
      background-color: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.primary};
    }

    &::after {
      content: "";
      position: absolute;
      top: 4px;
      left: 4px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.colors.background};
      transition: background-color 0.3s ease;
    }

    &:checked::after {
      background-color: ${({ theme }) => theme.colors.white};
    }
  }
`;

const RadioButton = styled.input`
  display: none;
`;

const FilterRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const FilterBar = ({ setFilters }) => {
  const [localFilters, setLocalFilters] = useState({
    category: "All",
    city: "All",
    price: "All",
  });

  // Uppdatera externa filters när lokala filters ändras
  useEffect(() => {
    const normalizedFilters = Object.fromEntries(
      Object.entries(localFilters).map(([key, value]) => [key, value === "All" ? "" : value])
    );
    setFilters(normalizedFilters);
  }, [localFilters, setFilters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <FilterContainer>
      <Fieldset>
        <SectionTitle>Category</SectionTitle>
        {["All", "Theater", "Family", "Music", "Fashion", "Sports", "Food", "Art", "Dance", "Film", "Science", "Literature", "Comedy"].map((category) => (
          <Label key={category}>
            <RadioButton
              type="radio"
              name="category"
              value={category}
              checked={localFilters.category === category}
              onChange={handleFilterChange}
            />
            {category}
          </Label>
        ))}
      </Fieldset>

      <FilterRow>
        <Fieldset>
          <SectionTitle>City</SectionTitle>
          {["All", "Malmö", "Lund"].map((city) => (
            <Label key={city}>
              <RadioButton
                type="radio"
                name="city"
                value={city}
                checked={localFilters.city === city}
                onChange={handleFilterChange}
              />
              {city}
            </Label>
          ))}
        </Fieldset>

        <Fieldset>
          <SectionTitle>Price</SectionTitle>
          {["All", "Free", "Paid Entry"].map((price) => (
            <Label key={price}>
              <RadioButton
                type="radio"
                name="price"
                value={price}
                checked={localFilters.price === price}
                onChange={handleFilterChange}
              />
              {price}
            </Label>
          ))}
        </Fieldset>
      </FilterRow>
    </FilterContainer>
  );
};

FilterBar.propTypes = {
  setFilters: PropTypes.func.isRequired,
};

export default FilterBar;
