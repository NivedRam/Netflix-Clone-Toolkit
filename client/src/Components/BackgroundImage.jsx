import React from "react";
import Background from "../Assets/login.jpg";
import styled from "styled-components"
function BackgroundImage() {
  return (
    <Container>
      <img src={Background} alt="Background" />
    </Container>
  );
}
export default BackgroundImage;
// styles
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  img {
    height: 100vh;
    width: 100vw;
  }
`;
