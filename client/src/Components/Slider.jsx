import React from "react";
import CardSlider from "./CardSlider";
import styled from "styled-components";

function Slider({ movies, genres }) {
  console.log("movies from component", movies);
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };

  return (
    <Container>
      <div >
        <CardSlider
          title="Trending Now"
          data={getMoviesFromRange(0, 10)}
          genres={genres}
        />
      </div>
      <div>
        <CardSlider
          title="New Releases"
          data={getMoviesFromRange(10, 20)}
          genres={genres}
        />
      </div>
      <div>
        <CardSlider
          title="Top 10 "
          data={getMoviesFromRange(20, 30)}
          genres={genres}
        />
      </div>
      <div>
        <CardSlider
          title="Popular On Netflix"
          data={getMoviesFromRange(30, 40)}
        />
      </div>
      <div>
        <CardSlider title="Action Movies" data={getMoviesFromRange(40, 50)} />
      </div>
      <div>
        <CardSlider
          title="Epics on Netflix"
          data={getMoviesFromRange(50, 60)}
        />
      </div>
    </Container>
  );
}

export default Slider;
const Container = styled.div``;
