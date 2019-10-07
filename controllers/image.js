const clarifai = require('clarifai')


const app = new Clarifai.App({
 apiKey: 'dd1072f9c45a43539be2bf80fbb73880'
});

const handleApiCall = (req,res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data =>{
		res.json(data);
	})
	.catch(err => res.status(400).json("Unable to fetch from API"))
}

const handleImage = (req,res,db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries',1)
	.returning('entries')
	.then(en => {
		res.json(en[0]);
	})
	.catch(err => res.status(400).json('Error getting entries'))
	
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};