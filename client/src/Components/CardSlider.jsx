import React, { useRef, useState } from "react";
import MediaCard from "./MediaCard";
import { Grid, listClasses } from "@mui/material";
import styled from "styled-components";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";

function CardSlider({ data, title, genres }) {
  const [showControls, setSowControls] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const listRef = useRef();
  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    console.log("distance", distance);

    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 4) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
    console.log("direction", direction);
  };
  return (
    <Container
      className="flex column"
      onMouseEnter={() => setSowControls(true)}
      onMouseLeave={() => setSowControls(false)}
    >
      <h1>{title}</h1>
      <div className="wrapper">
        <div
          className={`slider-action left${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineLeft onClick={() => handleDirection("left")} />
          {/* <AiOutlineLeft onClick={() => console.log("slider", "left")} /> */}
        </div>

        <div className="slider flex" ref={listRef}>
          <Grid container sx={{ display: "flex" }} spacing={0}>
            {data.map((movie, index) => (
              //<Grid>
              <MediaCard
                movieData={movie}
                genreData={genres}
                index={index}
                key={movie.id}
              />
              // </Grid>
            ))}
          </Grid>
        </div>

        <div
          className={`right slider-action right${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineRight onClick={() => handleDirection("right")} />
          {/* <AiOutlineRight onClick={() => console.log("slider", "right")} /> */}
        </div>
      </div>
    </Container>
  );
}

export default CardSlider;
const Container = styled.div`
  gap: 1rem;
  position: relative;
  padding: 2rem 0;
  h1 {
    margin-left: 50px;
  }
  .wrapper {
    .slider {
      width: max-content;
      gap: 2rem;
      transform: transelateX(0px);
      transition: 0.3s ease in out;
      margin-left: 50px;
    }
    .slider-action {
      position: absolute;
      z-index: 99;
      height: 100%;
      top: 0;
      bottom: 0;
      width: 50px;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 2rem;
      }
    }
    .none {
      display: none;
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }
`;
