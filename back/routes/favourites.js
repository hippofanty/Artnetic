const { Router } = require("express");
const router = Router();
const User = require('../db/models/user.model');

router
  .route('/:userId')
  .get( async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findById({_id: userId}).populate(['category', 'user', 'favourites']);
      const myFavourites = user.favourites;
      res.status(200).json({ myFavourites });
    } catch (error) {
      console.log(error)
      return res.status(500);
    }
  })
  .put( async (req, res) => {
    const { userId } = req.params;
    console.log('USER ID:' , userId);
    const { workId } = req.body;
    console.log('WORK ID:' , workId);

    try {
      const setFavourites = await User.findByIdAndUpdate({ _id: userId }, { $push: { favourites: workId }}, { new: true }).populate(['category', 'user', 'favourites']);
      const updatedFavourites = setFavourites.favourites[setFavourites.favourites.length - 1];
      console.log(updatedFavourites)
      return res.status(200).json({ updatedFavourites });
    } catch (error) {
      console.log(error)
      return res.status(500);
    }
  });

module.exports = router;
