const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();
const bcryptSalt =  bcrypt.genSaltSync(10);

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
	const userDocument = await User.create({
		name,
		email,
		password:bcrypt.hashSync(password, bcryptSalt),
	});

	res.json(userDocument);
})
app.listen(4000);