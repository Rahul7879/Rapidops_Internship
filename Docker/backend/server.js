const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors package
const routes = require('./src/users/routes');

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
// const MONGODB_URI = 'mongodb+srv://rahul:Rahul%4078@cluster0.hcsja8k.mongodb.net/db';

mongoose.connect(MONGODB_URI).then(() => {
    console.log("DB connected");
}).catch(err => {
    console.error("DB connection error:", err);
});

// Use cors middleware
app.use(cors());
app.use(express.json());
app.use('', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
