const {addToLikedMovies}=require("../controler/UserControler");
const router=require("express").Router();
router.post("/add",addToLikedMovies);   

module.exports=router;
