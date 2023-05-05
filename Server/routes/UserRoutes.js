const {addToLikedMovies, getLikedMovies, removeFromLIkedMovies}=require("../controler/UserControler");
const router=require("express").Router();
router.post("/add",addToLikedMovies);   
router.get("/liked/:email",getLikedMovies)
router.put("/delete",removeFromLIkedMovies)

module.exports=router;
