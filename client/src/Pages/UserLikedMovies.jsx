import React from "react";
// import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres, getUserLikedMovies } from "../Store/Index";
import { firebaseAuth } from "../utils/Firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "../Components/Navbar";
import Slider from "../Components/Slider";
import NotAVailable from "../Components/NotAVailable";
import MediaCard from "../Components/MediaCard";

import SelectGenre from "../Components/SelectGenre";

function UserLikedMovies() {
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

  console.log("movies fom Netflix", movies);

  const dispatch = useDispatch();
  const [email, setEmail] = useState(undefined);
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      console.log("currentUser", currentUser);
      if (currentUser) setEmail(currentUser.email);
      else navigate("/login");
    });
  }, []);

  useEffect(() => {
    if (email) {
      dispatch(getUserLikedMovies(email));
    }
  }, [email]);

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
          {movies.map((movie, index) => {
            return (
              <MediaCard
                movieData={movie}
                index={index}
                key={movie.id}
                isliked={true}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
}

export default UserLikedMovies;
const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 2rem;
    }
  }
`;
