const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'anythingWecanGuessOfLikeImeanAnything'

const app = express();

app.use(express.json());
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
			jwt.sign({ email: userDocument.email, id: userDocument._id }, jwtSecret, {}, (err, token) => {
				if (err) throw err;
				res.cookie('token', token).json('pass ok');
			})
			res.cookie('token', '').json(userDocument);
		}
		else {
			res.status(422).json('pass not ok');
		}
	}
	else {
		res.json('not found');
	}
});

app.listen(4000);
