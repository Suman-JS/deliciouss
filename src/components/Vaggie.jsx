import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

function Vaggie() {
  const [vaggie, setVaggie] = useState([]);

  useEffect(() => {
    getVaggie();
  }, []);

  const getVaggie = async () => {
    const check = localStorage.getItem("Vaggie");

    if (check) {
      setVaggie(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=f1da6b9278a744c6944bfe84f520ca30&number=12&tags=vegetarian`
      );
      const data = await api.json();
      localStorage.setItem("Vaggie", JSON.stringify(data.recipes));
      setVaggie(data.recipes);
    }
  };

  return (
    <Wrapper
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Our Vegetarian Picks</h3>
      <Splide
        options={{
          perPage: 3,
          pagination: false,
          arrows: false,
          drag: "free",
          gap: "3rem",
        }}
      >
        {vaggie.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <Card>
                <Link to={"/recipe/" + recipe.id}>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Gradient />
                </Link>
              </Card>
            </SplideSlide>
          );
        })}
      </Splide>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  margin: 4rem 0rem;
  h3 {
    margin-bottom: 2rem;
  }
`;
const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0 0 0 /0), rgba(0 0 0 /0.5));
`;

export default Vaggie;
