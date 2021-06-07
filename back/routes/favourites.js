const { Router } = require("express");
const router = Router();
const User = require('../db/models/user.model');

router
  .route('/:userId')
  .get( async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById({_id: userId}).populate('favourites');
      const myFavourites = user.favourites;

      res.status(200).json({ myFavourites });
    } catch (error) {
      console.log(error)
      return res.status(500);
    }
  })
  .put( async (req, res) => {
    const { userId } = req.params;
    const { workId } = req.body;

    try {
      const setFavourites = await User.findByIdAndUpdate({ _id: userId }, { $push: { favourites: workId }}, { new: true }).populate('favourites');
      
      const updatedFavourites = setFavourites.favourites[setFavourites.favourites.length - 1];

      return res.status(200).json({ updatedFavourites });
    } catch (error) {
      console.log(error)
      return res.status(500);
    }
  })
  .delete( async (req, res) => {
    const { userId } = req.params;
    const { workId } = req.body;

    try {
      const user = await User.findByIdAndUpdate({ _id: userId }, { $pull: { favourites: workId }});

      return res.status(200).json({message: 'deleted'});
    } catch (error) {
      console.log(error)
      return res.status(500);
    }
  });

module.exports = router;
