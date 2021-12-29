const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

const mongoose = require('mongoose');
const connect = mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// body-parser option
// application/x-www-from-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());
// cookie-parser option
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

app.get('/', (req, res) => res.send('<h1>Hello World! 반갑습니다!</h1>'));


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}!`)
});