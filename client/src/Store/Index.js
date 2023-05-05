import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { TMDB_BASE_URL } from "../utils/Constants";
import { API_key } from "../utils/Constants";
import axios from "axios";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  console.log("getGenres called");
  const {
    data: { genres },
  } = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=9ffb911c86d50c7d1145ac011961b146`
  );
  // console.log(data);
  return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  console.log("fetchDataByGenre createArrayFromRawData");
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie.title ? movie.title : movie.orginal_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
  });
};
const getRawData = async (api, genres, paging=false) => {
  console.log("fetchDataByGenre triggered getRawData");
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
    console.log("fetchDataByGenre", results);
  }
  console.log("fetchDataByGenre moviesArray");
  return moviesArray;
};


export const fetchDataByGenre = createAsyncThunk(
  "netflix/moviesByGenre",
  async ({ genre, type }, thunkAPI) => {
    console.log("fetchDataByGenre", type);
    console.log("fetchDataByGenre genre", genre);
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    console.log("fetchDataByGenre genres", genres);
  const data= getRawData(
      `${TMDB_BASE_URL}/discover/${type}?api_key=${API_key}&with_genres=${genre}`,
      // `https://api.themoviedb.org/3/discover/movie?api_key=9ffb911c86d50c7d1145ac011961b146&with_genres=${genre}`,
      // `https://api.themoviedb.org/3/discover/${type}?api_key=3d39d6bfe362592e6aa293f01fbcf9b9&with_genres=${genre}`,
      genres,
      false
    );
    console.log(data)
    return data;
  }
);


export const fetchMovies = createAsyncThunk(
  "netflix/movies",
  async ({ type }, thunkAPI) => {
    console.log("fetchMovies");
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    console.log("thunk", genres);
    // return getRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${API_key}&with_genres=${genre}`)
    return getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_key}`,
      genres,
      true
    );
  }
);

export const getUserLikedMovies=createAsyncThunk("netflix/getliked",async(email)=>{
  const {data:{movies}}=await axios.get(`http://localhost:5000/api/user/liked/${email}`)
  return movies
});

export const removeFromLikedMovies=createAsyncThunk(
  "netflix/deleteliked",
  async({email,movieId})=>{
  const {data:{movies}
}=await axios.put(`http://localhost:5000/api/user/delete`,{
  email,movieId
})
  return movies
});


const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(removeFromLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});


export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
