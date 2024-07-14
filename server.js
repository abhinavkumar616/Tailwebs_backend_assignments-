const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const MongoStore = require('connect-mongo')
var morgan = require('morgan')
const cors = require('cors');

const app = express();
app.use(morgan('dev'))
// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors());

// CORS middleware setup
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's domain
  credentials: true, // Allow credentials (cookies)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// app.use(cors({
//   origin: 'http://localhost:3000/', // replace with your frontend's domain
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// Passport Config
require('./config/passport')(passport); // Correctly require the passport configuration

// Express session middleware
app.use(
  session({
    secret: keys.secretOrKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      sameSite: 'strict',
      // maxAge: 3600000 // 1 hour
    },
    // store: MongoStore.create({ mongoUrl: keys.mongoURI })
  })
);




// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global variables for flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/students', require('./routes/students'));

app.get('/api/users/check-session', (req, res) => {
  if (req.session && req.session.userId) {
      res.json({ isValid: true });
  } else {
      res.json({ isValid: false });
  }
});



app.use('*', async (req, res, next) => {
  return res.status(400).send({
    status: false,
    message: "Routes not found"
  })
})


// MongoDB Connection
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
