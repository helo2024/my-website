const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydashboard';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    signInDates: [String]
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.status(400).send('Username already exists');
    }

    const user = new User({ username, password, signInDates: [] });
    await user.save();
    res.status(201).send('Registration successful');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (!user) {
        return res.status(400).send('Invalid username or password');
    }

    res.status(200).send('Login successful');
});

app.post('/sign-in', async (req, res) => {
    const { username } = req.body;
    const today = new Date().toISOString().split('T')[0];
    await User.updateOne({ username }, { $addToSet: { signInDates: today } });
    res.status(200).send('Signed in successfully');
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.status(200).send(users);
});

// Serve the HTML files for the front-end
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});
