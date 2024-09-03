const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const authRoutes = require('./routes/auth');
const port = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static("public"));
app.use('/uploads', express.static('uploads'));


// Use the auth routes
app.use(authRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
