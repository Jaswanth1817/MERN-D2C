const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://jaswanth:jaswanth123@auth.s1qgo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Connect To Database
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log(`Connected to database ${MONGODB_URI}`))
  .catch((err) => console.log(`Database error: ${err}`));

const app = express();

const users = require('./routes/user.routes');

// Port Number
const port = process.env.PORT || 3000;

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});