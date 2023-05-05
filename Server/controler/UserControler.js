const User = require("../model/UserModel");

module.exports.addToLikedMovies = async (req, res) => {
  console.log("data to", req.body.data);
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      const { likedMovies } = user;
      const movieAllreadyLiked = likedMovies.find(({ id }) => id === data.id);
      console.log("movieAllreadyLiked", movieAllreadyLiked);
      console.log("userId", user._id.toString());
      if (movieAllreadyLiked === undefined) {
        console.log("Call activated", data);
        // const us = await user
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "movie allready added to the liked list" });
    } else await User.create({ email, likedMovies: [data] });
    return res.json({ msg: "movie added successfully" });
  } catch (error) {
    return res.json({ msg: "Error", error });
  }
};

module.exports.getLikedMovies = async (req, res) => {
  console.log("get data", req.body.data);
  try {
    const { email } = req.params;

    const user = await User.findOne({ email });
    if (user) {
      res.json({ msg: "success", movies: user.likedMovies });
    } else {
      return res.json({ msg: "user with given email not found " });
    }
  } catch {
    return res.json({ msg: "error adding movies" });
  }
};
module.exports.removeFromLIkedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieIndex = likedMovies.findIndex(({ id }) => id === movieId);
      if (!movieIndex) res.status(400).send({ msg: "movie not found" });
      likedMovies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(user._id, {
        likedMovies,
      },
      {new:true}
      );
      return res.json({msg:"movie deleted",movies:likedMovies})
    }
    
  } catch {}
};
