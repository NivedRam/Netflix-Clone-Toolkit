import React from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import video from "../Assets/stranger.mp4";
import { useNavigate } from "react-router-dom";

function Player() {
    const navigate=useNavigate()
  return (
    <div>
      <div className="player" style={{width:"100vw",height:"100vw"}}>
        <div className="back" style={{position:"absolute",zIndex:"1",padding:"20px"}}>
            <BsArrowLeft style={{fontSize:"50px"}} onClick={(()=>navigate(-1))}/>
        </div>
        <video src={video} autoPlay loop controls muted style={{height:"100%",width:"100%",objectFit:"cover"}}></video>
      </div>
    </div>
  );
}

export default Player;
