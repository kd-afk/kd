const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const session = require('express-session');
const router = express.Router();
const { sql, poolPromise } = require("../db/db");
const ensureAuthenticated = require("./authMiddleware");
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');

const secret = crypto.randomBytes(64).toString('hex');
router.use(session({
  secret: secret, 
  resave: false,
  saveUninitialized: false
}));


// Route for rendering signup page
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Route to handle signup
router.post("/signup", [
  body('fname').notEmpty().withMessage('First name is required'),
  body('lname').notEmpty().withMessage('Last name is required'),
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Please provide a valid email').notEmpty().withMessage('Email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('mNumber').isLength({ min: 10, max: 10 }).withMessage('Mobile number must be 10 digits').isNumeric().withMessage('Mobile number must contain only numbers'),
  body('address').notEmpty().withMessage('Address is required')
] ,async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  else{
    const { username, email, password , fname, lname, mNumber, address} = req.body;
    
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const pool = await poolPromise;
      const request = pool.request();
      request.input("username", sql.NVarChar, username);
      request.input("email", sql.NVarChar, email);
      request.input("password", sql.NVarChar, hashedPassword);
      request.input("fname", sql.NVarChar, fname);
      request.input("lname", sql.NVarChar, lname);
      request.input("mNumber", sql.NVarChar, mNumber);
      request.input("address", sql.NVarChar, address);
  
      await request.execute("spCreateUser");
      res.render("login");
    } catch (err) {
      console.error("Error during signup:", err);
      res.render("signup", { message: "Error during signup. Please try again." });
    }
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login",[
  body('emailORusername').notEmpty().withMessage('Username or Email is required'),
  body('password').notEmpty().withMessage('Password is required')
],async (req, res) => {

  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
  const { emailORusername, password } = req.body;
  try {
    const pool = await poolPromise;
    const request = pool.request();

    request.input("email", sql.NVarChar, emailORusername);

    const result = await request.execute("spAuthenticateUser");

    if (result.recordset.length === 0) {
      return res.render("login", { message: "Invalid username/email or password." });
    }

    const storedHashedPassword = result.recordset[0].password;

    const isMatch = await bcrypt.compare(password, storedHashedPassword);

    if (isMatch) {
      req.session.user = result.recordset[0];
      res.redirect("/dashboard");
    } else {
      res.render("login", { message: "Invalid username/email or password." });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.send("An error occurred during login.");
  }
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.session.user }); 
});

router.get("/forgot-password", (req, res) => {
  res.render("forgot-password");
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const pool = await poolPromise;
    const request = pool.request();

    const token = crypto.randomBytes(20).toString("hex");

    const expires = new Date();
    expires.setHours(expires.getHours() + 8);

    request.input("email", sql.NVarChar, email);
    request.input("token", sql.NVarChar, token);
    request.input("expires", sql.DateTime, expires);
    
    const result = await request.execute('RequestPasswordReset');
    

    if (result.recordset[0].Result === 0) {
      return res.render("forgot-password", {
        message: "No account found with that email.",
      });
    }
    else{
      //const user = result.recordset[0];
  
      // Send an email with the reset link
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "rajputkuldeepsingh936@gmail.com",
          pass: "xzvm fndp mfle zxwg",
        },
      });
  
      const mailOptions = {
        to: email,
        from: "rajputkuldeepsingh936@gmail.com",
        subject: "Password Reset",
        text:
          `You are receiving this because you have requested the reset of the password for your account.\n\n` +
          `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
          `http://${req.headers.host}/reset-password/${token}\n\n` +
          `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.render("forgot-password", {
        message:
          "An email has been sent to " +
          email +
          " with further instructions.",
      });

    }

  } catch (err) {
    console.error("Error during password reset request:", err);
    res.render("forgot-password", {
      message:
        "An error occurred during the password reset process. Please try again.",
    });
  }
});

router.get("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  res.render("reset-password", { token });
  
  // try {
  //   const pool = await poolPromise;
  //   const request = pool.request();

  //   request.input("token", sql.NVarChar, token);

  //   const result = await request.execute('ResetPassword');

  //   if (result.recordset[0].Result === 0) {
  //     return res.render("reset-password", {
  //       message: "Password reset token is invalid or has expired.",
  //       token,
  //     });
  //   }else{
  //   }

  // } catch (err) {
  //   console.error("Error during password reset:", err);
  //   res.render("reset-password", {
  //     message:
  //       "An error occurred during the password reset process. Please try again.",
  //   });
  // }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const pool = await poolPromise;
    const request = pool.request();

    request.input("token", sql.NVarChar, token);

    const hashedPassword = await bcrypt.hash(password, 10);

    request.input("hashed_password", sql.NVarChar, hashedPassword);

    const result = await request.execute('ResetPassword');

    if (result.recordset[0].Result === 0) {
      return res.render("reset-password", {
        message: "Password reset token is invalid or has expired.",
        token,
      });
    }

    res.render("login", {
      message:
        "Your password has been updated successfully. Please log in with your new password.",
    });
  } catch (err) {
    console.error("Error during password reset:", err);
    res.render("reset-password", {
      message:
        "An error occurred during the password reset process. Please try again.",
      token,
    });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
      if (err) {
          return next(err);
      }
      res.redirect('/login');
  });
});

router.get('/check-username', async (req, res) => {
  const { username } = req.query;

  try {
      const pool = await poolPromise;
      const request = pool.request();

      request.input('username', sql.NVarChar, username);

      // Execute the stored procedure
      const result = await request.execute('CheckUsernameAvailability');
      const userCount = result.recordset[0].UserCount;

      if (userCount > 0) {
          return res.json({ available: false });
      } else {
          return res.json({ available: true });
      }
  } catch (err) {
      console.error('Error during username availability check:', err);
      return res.status(500).json({ available: false, error: 'Server error' });
  }
});


// Configure Multer for file uploads (profile picture)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, req.session.user.id + path.extname(file.originalname)); // Use user ID for filename
  }
});

const upload = multer({ storage: storage });


// Route to render the user profile page
router.get('/profile',ensureAuthenticated, async (req, res) => {
  try {
      // console.log(req.user)
      // const pool = await poolPromise;
      // const request = pool.request();
      // request.input('id', sql.Int, req.user.id); // Assuming user ID is stored in session

      // // Execute the stored procedure
      // const result = await request.execute('GetUserProfile');
      // const user = result.recordset[0];

      res.render('profile', { user: req.session.user});
  } catch (err) {
      console.error('Error fetching user data:', err);
      res.status(500).send('Server error');
  }
});
// Route to handle profile updates
router.post('/profile', upload.single('profilePicture'), async (req, res) => {
  const { firstName, lastName, email, mobile, address } = req.body;
  const profilePicture = req.file ? req.file.filename : req.body.existingProfilePicture;
  user = req.session.user

  try {
      const pool = await poolPromise;
      const request = pool.request();
      request.input('id', sql.Int, user.id);
      request.input('fname', sql.NVarChar, firstName);
      request.input('lname', sql.NVarChar, lastName);
      request.input('email', sql.NVarChar, email);
      request.input('mNumber', sql.NVarChar, mobile);
      request.input('address', sql.NVarChar, address);
      request.input('profilePicture', sql.NVarChar, profilePicture);

      // Execute the stored procedure
      await request.execute('UpdateUserProfile');

      res.redirect('/dashboard');
  } catch (err) {
      console.error('Error updating user profile:', err);
      res.status(500).send('Server error');
  }
});


module.exports = router;