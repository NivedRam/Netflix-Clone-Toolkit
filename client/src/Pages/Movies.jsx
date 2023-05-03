import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../Store/Index";
import { firebaseAuth } from "../utils/Firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "../Components/Navbar";
import Slider from "../Components/Slider";
import NotAVailable from "../Components/NotAVailable";

import SelectGenre from "../Components/SelectGenre";

function Movies() {
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
    if (genresLoaded) dispatch(fetchMovies({ type: "movie" }));
  }, [genresLoaded]);
  // console.log(movies, "movies");
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    console.log("currentUser", currentUser);
    // if (currentUser) navigate("/");
  });

  return (
    <Container>
           <Navbar isScrolled={isScrolled} />

      <div style={{marginTop:"105px",position:"sticky"}}>
        <SelectGenre genres={genres} type="movies" />
      </div>

      <div className="data">
        {movies.length ? <Slider movies={movies} /> : <NotAVailable />}
      </div>
    
    </Container>
  );
}

export default Movies;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;
