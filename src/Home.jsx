import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import sky from "./assets/sky.jpg"

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${sky}); 
  background-size: cover;
  background-position: center;
  position: relative;
`;

const MainContent = styled.main`
  text-align: center;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.784); 
  color: #fff;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <MainContent>
        <h1>Welcome to Events for Days!</h1>
        <p>
          Discover amazing events happening around you! From music concerts to art exhibitions,
          we have something for everyone.
        </p>
        <button
          onClick={() => navigate("/events")}
          style={{
            padding: "1rem 2rem",
            fontSize: "1rem",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Explore Events
        </button>
      </MainContent>
    </HomeContainer>
  );
};

export default Home;
