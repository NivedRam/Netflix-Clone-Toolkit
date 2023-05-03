import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import BackgroundImage from "../Assets/home.jpg";
import movieLogo from "../Assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../Store/Index";
import Slider from "../Components/Slider";
import styled from "styled-components";
import GridCheck from "../Components/GridCheck";

function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageXOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  const navigate = useNavigate();
  const { genresLoaded } = useSelector((state) => state.netflix);
  // const movies = useSelector((state) => state.netflix.movies);
  console.log("genresLoaded", genresLoaded);

  const { movies } = useSelector((state) => state.netflix);
  const { genres } = useSelector((state) => state.netflix);
  console.log("movies fom Netflix", movies);
  console.log("mov gennnn", genres);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
    // dispatch(fetchMovies())
  }, []);
  useEffect(() => {
   
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded]);
  // console.log(movies, "movies");

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img src={BackgroundImage} alt="background-image" />
        <div className="container">
          <div className="logo">
            <img src={movieLogo} alt="movie-logo" />
          </div>
          <div className="button flex">
            <button
              onClick={() => navigate("/player")}
              className="flex j-center a-center"
            >
              <FaPlay />
              play
            </button>
            <button className="flex a-center j-center">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} genres={genres} />
    </Container>
  );
}

export default Netflix;

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;
