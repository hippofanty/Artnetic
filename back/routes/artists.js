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
        console.log(artist, 'artist');
        return await User.findOne({_id: artist._id}).populate('works');
      }
    }))
    artistsArray = artistsArray.filter(item => item !== undefined)
    console.log(artistsArray, 'artistsArray')
		return res.status(200).json({artistsArray});
	} catch (error) {
		console.log(error);
    return res.sendStatus(400);
	}
});


module.exports = router;
