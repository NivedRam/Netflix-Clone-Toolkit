import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import { CardActionArea, Grid } from "@mui/material";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import video from "../Assets/stranger.mp4";
// import styled from "styled-components";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbDownFill, RiThumbUpFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import styled from "styled-components";
import { firebaseAuth } from "../utils/Firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

function MediaCard({ movieData, genreData, isliked = false }) {
  // const [isHovered,setIsHovered]=useState(false)
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      console.log("currentUser", currentUser);
      if (currentUser) setEmail(currentUser.email);
      else navigate("/login");
    });
  }, []);

  const addToList = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/add", {
        email,
        data: movieData,
      });
      console.log("onclicked");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container
      //   style={{
      //     maxWidth: "230px",
      //     width: "230px",
      //     height: "100%",
      //     cursor: "pointer",
      //     position: "relative",
      //   }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <CardMedia
          //   style={{ width: "100%", height: "100%", zIndex: "10" }}
          component="img"
          height="140"
          image={`https://image.tmdb.org/t/p/w500${movieData.image}`}
          alt="image"
          //   onMouseEnter={() => setIsHovered(true)}
          //   onMouseLeave={() => setIsHovered(false)}
        />
      </Card>

      {isHovered && (
        <div
          className="hover"
          //   style={{
          //     zIndex: "90",
          //     height: "max-content",
          //     width: "20rem",
          //     position: "absolute",
          //     top: "-18vh",
          //     left: "0",
          //     boxShadow: "rgba(0,0,0,0.75)0px 3px 10px",
          //     backgroundColor: "#181818",
          //     transition: "ease-in-out 0.3s",
          //   }}
        >
          <div
            className="image-video-container"
            // style={{ position: "relative", height: "140px" }}
          >
            <img
              //   style={{
              //     width: "100",
              //     height: "144px",
              //     objectFit: "cover",
              //     borderRadius: "0.3rem",
              //     top: "0",
              //     zIndex: "4",
              //     position: "absolute",
              //   }}
              src={`http://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="image1"
              onClick={() => navigate("/player")}
            />
            <video
              //   style={{
              //     width: "100%",
              //     height: "140ps=x",
              //     objectFit: "cover",
              //     borderRadius: "0.3rem",
              //     top: "0",
              //     zIndex: "5",
              //     position: "absolute",
              //     display: "none",
              //   }}
              src={video}
              autoPlay
              loop
              muted
              onClick={() => navigate("/player")}
            />
          </div>
          <div className="info-container flex column">
            <h3 className="name" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="icons flex j-between">
              <IoPlayCircleSharp
                title="play"
                onClick={() => navigate("/player")}
              />
              <RiThumbUpFill title="like" />
              <RiThumbDownFill title="dislike" />

              {isliked ? (
                <BsCheck title="Remove From List" />
              ) : (
                <AiOutlinePlus title="Add to my list"  onClick={addToList} />
              )}
            </div>
            <div className="info">
              <BiChevronDown title="More Info" />
            </div>
            <div className="genres flex">
              <ul className="flex">
                {movieData.genres.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default MediaCard;
const Container = styled.div`
  max-width: 230px;
  width: 153px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;
