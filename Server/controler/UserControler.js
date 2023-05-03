const User = require("../model/UserModel");

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAllreadyLiked = likedMovies.find(({ id }) => (id = data.id));
      if (!movieAllreadyLiked) {
        await user.findByIdAndUpdate(user._id, {
          likedMovies: [...user.likedMovies, data],
        },
        {new:true});
        
      }
      else return res.json({msg:"movie allready added to the liked list"});
    }
    else await User.create({email,likedMovies:[data]});
    return res.json({msg:"movie added successfully"})
  } catch (error) {
    return res.json({ msg: "Error" });
  }
};
