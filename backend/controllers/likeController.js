const Like = require('../models/Like');


exports.createLike = async(req,res)=>{
    try{
    const { user_id,movie_id} =req.body;
    const likeData = {
        user_id,
        movie_id
    };

    const result = await Like.createLike(likeData);
    res.status(201).json({message:'Movie is liked'});
} catch(error){
    console.error('Error liking the movie',error);
    res.status(500).json({error:'An error occured while liking the movie'});
}

}