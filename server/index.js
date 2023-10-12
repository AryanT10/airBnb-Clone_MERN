const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
require('dotenv').config();
const fs= require('fs')

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'anythingWecanGuessOfLikeImeanAnything'

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(cors(
	{
		credentials: true,
		origin: 'http://127.0.0.1:5173',

	}
));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
	res.json('test ok');
});

app.post('/register', async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const userDocument = await User.create({
			name,
			email,
			password: bcrypt.hashSync(password, bcryptSalt),
		});
		res.json(userDocument);
	}
	catch {
		res.status(422).json(e);
	}

});

app.post('/login', async (req, res) => {
	const { email, password } = req.body;
	const userDocument = await User.findOne({ email });
	if (userDocument) {
		const passOk = bcrypt.compareSync(password, userDocument.password);
		if (passOk) {
			jwt.sign({
				email: userDocument.email,
				id: userDocument._id,
			}, jwtSecret, {}, (err, token) => {
				if (err) throw err;
				res.cookie('token', token).json('pass ok');
			})
		}
		else {
			res.status(422).json('pass not ok');
		}
	}
	else {
		res.json('not found');
	}
});

app.get('/profile', (req, res) => {
	const { token } = req.cookies;
	if (token) {
		jwt.verify(token, jwtSecret, {}, async (err, userData) => {
			if (err) throw err;
			const { name, email, _id } = await User.findById(userData.id);
			res.json({ name, email, _id });
		});
	}
	else {
		res.json(null);
	}
})

app.post('/logout', (req, res) => {
	res.cookie('token', '').json(true);  
});

app.post('/upload-by-link', async (req, res) => {
	const { link } = req.body;
	const newName = 'photo' + Date.now() + '.jpg';
	const { filename } = await imageDownloader.image({
		url: link,

		dest: __dirname + '/uploads' + `/${newName}`,
	});
	res.json(newName);
});

// const photosMiddleware = multer({ dest: 'uploads/' });
// app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
// 	const uploadedFiles = []
// 	for (let i = 0; i < req.files.length; i++){
// 		const { path,originalName } = req.files[i];
// 		const parts = originalName.split('.');
// 		const ext = parts[parts.length - 1];
// 		const newPath = path + '.' + ext;
// 		fs.renameSync(path, newPath);
// 		uploadedFiles.push(newPath.replace('uploads/',''));
// 	}
// 	res.json(uploadedFiles);
// })

const photosMiddleware = multer({ dest: 'uploads/' });
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
	const uploadedFiles = [];
	for (let i = 0; i < req.files.length; i++) {
		console.log(req.files[i])
		const { path, originalname } = req.files[i];
		if (originalname) {
			const parts = originalname.split('.');
			if (parts.length > 1) {
				const ext = parts[parts.length - 1];
				const newPath = path + '.' + ext;
				fs.renameSync(path, newPath);
				uploadedFiles.push(newPath);
			} else {
				// Handle the case where the file doesn't have an extension
				uploadedFiles.push(path);
			}
		}
	}
	console.log(uploadedFiles)
	res.json(uploadedFiles);
});


app.listen(4000);
