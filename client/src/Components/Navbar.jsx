import React from "react";
import { useState } from "react";
import styled from "styled-components";
import logo from "../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/Firebase-config";
import { onAuthStateChanged } from "firebase/auth";

function Navbar({ isScrolled }) {
  const links = [
    { name: "Home", link: "/ " },
    { name: "TV Shows", link: "/tv " },
    { name: "Movies", link: "/movies" },
    { name: "My list", link: "/mylist" },
  ];

  const [showSearch, setShowSearch] = useState(false);
  const [displayInput, setDisplayInput] = useState("none");
  const [inputHover, setInputHover] = useState(false);
  // console.log(showSearch, "search");
  // console.log(inputHover, "hover");
  // console.log("displayInput", displayInput);
  const handleFocusButton = () => {
    console.log("working");
    setDisplayInput("inline-block ");
  };
  const navigate=useNavigate();
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    // console.log("currentUser", currentUser);
    if (!currentUser) navigate("/login");
  });
  return (
    <Container>
      <nav className={`flex${isScrolled ? "scrolled" : ""}`}>
        <div className="left flex a-center">
          <div className="brand a-center j-center flex">
            <img src={logo} alt="" />
          </div>
          <ul className="links flex">
            {links.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right flex a-center">
          {/* <div className={`search ${showSearch ? "show-search" : ']"'}`}> */}
          <div
            onMouseOver={() => handleFocusButton()}
            onMouseLeave={() => setDisplayInput("none")}
          >
            <button
              className="searchbtn"

              // onFocus={() => setShowSearch(true)}
              // onBlur={() => {
              //   if (!inputHover) setShowSearch(false);
              // }}
            >
              <SearchIcon />
            </button>

            <input
              className="inputbox"
              style={{
                color: "Black",
                display: displayInput,
                backgroundColor: "white",
                transition: " 1s ease-in-out",
                borderRadius:"15px",
                width:"200px",
                height:"30px",
                
                
                
              }}
              type="text"
              placeholder="Search"
              // onMouseEnter={() => setInputHover(true)}
              // onMouseLeave={() => setInputHover(false)}
              // onBlur={() => {
              //   setInputHover(false);
              //   setShowSearch(false);
              // }}
            />
          </div>
          <button onClick={() => {
            alert("Loged out Please Login")
            signOut(firebaseAuth)}}>
            <PowerSettingsNewIcon className="power" />
          </button>
        </div>
      </nav>
    </Container>
  );
}
const Container = styled.div`
  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
      }
      .power {
        color: #f34242;
        font-size: 1.2rem;
      }
      .searchbtn {
        color: white;
        font-size: 1.2rem;
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;

          &:focus {
            outline: none;
          }
          SearchIcon {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }
`;

export default Navbar;
