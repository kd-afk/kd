
/*
app.set("views", path.join(__dirname, "views"));
// Set up session management
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Use true in production with HTTPS
  })
);

      // Store user information in the session
      req.session.userId = user.id;
      req.session.username = user.username;

      res.send("Logged in successfully!");


// Route to display the list of users
app.get("/users", (req, res) => {
  res.render("users", { users });
});

// Route for editing a user (show form)
app.get('/users/:id/edit', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  res.render('edit_user', { user }); 
});
  app.get('/edit_user', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  res.render('edit_user', { user });
});

// Route for handling DELETE requests
app.delete('/users/:id', (req, res) => {
  users = users.filter(user => user.id != req.params.id);
  res.redirect('/users');
});
  


// Serve a protected route
app.get("/profile", (req, res) => {
  if (!req.session.userId) {
    return res.status(403).send("Not authorized");
  }

  res.send(`Hello, ${req.session.username}! Welcome to your profile.`);
});



<% if (typeof message !== 'undefined') { %>
<p style="color: red;"><%= message %></p>
<% } %>


router.get('/home', (req, res) => {
  res.render('home', {
    title: 'Home Page',
    tasks: ['Task 1', 'Task 2', 'Task 3'] // Sample tasks for the to-do list
  });
});


let tasks = ['Task 1', 'Task 2', 'Task 3']; // This should be managed in a database in a real app

router.post('/add-task', (req, res) => {
  const { task } = req.body;
  if (task) {
    tasks.push(task);
  }
  res.redirect('/home');
});


// Route to display users
router.get('/users', async (req, res) => {
    try {
        const pool = await poolPromise;
        const query = 'SELECT id, username, email FROM users';
        const result = await pool.request().query(query);

        res.render('users', { users: result.recordset });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.send('An error occurred while fetching users.');
    }
});

app.js 
// app.use(passport.initialize());
// app.use(passport.session());
//const initializePassport = require('../../temp/passport-config');
//const bcrypt = require("bcrypt");
//const passport = require('passport');



auth js
//const passport = require('passport');
const initializePassport = require('../../../temp/passport-config');

 console.log(req.body.email);
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(emailPattern.test(req.body.email)){
    const { email , password} = req.body;
  }







  CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(100) UNIQUE,
    email NVARCHAR(100) UNIQUE,
    password NVARCHAR(255) NOT NULL,
    fname NVARCHAR(100),
    lname NVARCHAR(100),
    mNumber NVARCHAR(15),
    address NVARCHAR(MAX),
    resetPasswordToken NVARCHAR(255),
    resetPasswordExpires DATETIME;
);



*/
//2024-08-30 00:31:06
//2024-08-30 00:03:03.993
//2024-08-29T18:26:45.706Z
//


// process.env.TZ = "Asia/Calcutta";
// console.log(new Date().toString());
//const moment = require('moment-timezone');

// const indiaTime = moment().tz("Asia/Kolkata");
// console.log("Current time in IST:", indiaTime.format('YYYY-MM-DD HH:mm:ss:ms'));
// const time = indiaTime.add(1, 'hours').format('YYYY-MM-DD HH:mm:ss');
// console.log(time);

// const now = new Date.();
// const utcOffset = now.getTimezoneOffset(); // Get the local timezone offset in minutes
// const istOffset = 330; // IST offset is UTC+5:30, which is 330 minutes ahead
//const istTime = new Date(now.getTime() + (istOffset + utcOffset) * 60000);
//console.log("Current time in IST:", istTime.toISOString().slice(0, 19).replace('T', ' '));
//const now2 = istTime.toISOString().slice(0, 19).replace('T', ' ');

//2024-08-29 22:34:59.477


// const time = moment().tz("Asia/Kolkata");
    // const expires = time.add(1, 'hours').format('YYYY-MM-DD HH:mm:ss');