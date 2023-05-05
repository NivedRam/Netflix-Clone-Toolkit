import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Netflix from "./Pages/Netflix";
import Player from "./Pages/Player";
import Movies from "./Pages/Movies";
import TVShows from "./Pages/TVShows";
import UserLikedMovies from "./Pages/UserLikedMovies";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/" element={<Netflix />} />
          <Route exact path="/player" element={<Player />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route exact path="/TV" element={<TVShows/>} />
          <Route exact path="/mylist" element={<UserLikedMovies/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
