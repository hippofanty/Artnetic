const { Router } = require('express');
const router = Router();
const Category = require('../db/models/category.model');
const Work = require('../db/models/work.model');
const User = require('../db/models/user.model');


router.get('/',async (req, res) => {
	try {
		
    const artists = await User.find({role: 'Artist'}).lean();

    let artistsArray = await Promise.all(artists.map(async(artist) => {
      if (artist.works?.length > 0 && artist.works?.length !== undefined) {
        return await User.findOne({_id: artist._id}).populate('works');
      }
    }))
    artistsArray = artistsArray.filter(item => item !== undefined)
		return res.status(200).json({artistsArray});
	} catch (error) {
		console.log(error);
    return res.sendStatus(400);
	}
});
router.get('/:id',async (req, res) => {
  const { id } = req.params;
	try {
    const artist = await User.findOne({_id: id}).populate('works');
    const works = await Promise.all(artist.works.map(async (item) => await Work.findOne({_id: item._id}).populate(['category', 'user'])))
		return res.status(200).json({works});
	} catch (error) {
		console.log(error);
    return res.sendStatus(400);
	}
});

module.exports = router;
