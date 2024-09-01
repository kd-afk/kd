// passport-config.js
//const LocalStrategy = require("passport-local").Strategy;
//const bcrypt = require("bcrypt");
//const db = require('./db');
//const { sql, poolPromise } = require("../kd02/form/db/db"); // Assume you have a database module to interact with your users table
var user;

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    const pool = await poolPromise;
    const request = pool.request();
    request.input("email", sql.NVarChar, email);
    
    const result = await request.execute("spAuthenticateUser");
    user = result.recordset[0];
    //const user = await db.findUserByEmail(email); // Replace with your DB call

    if (!user) {
      return done(null, false, { message: "No user with that email" });
    }

    try {
      //console.log(user.password);
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (err) {
      return done(err);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => {
    console.log(user)
    done(null, user.id)});
  passport.deserializeUser(async (id,done) => {
    //console.log(user);
    //const user = await db.findUserById(id); // Replace with your DB call
    //const user1 = result.recordset[0];
    const user = await user.id;
    done(null, user);
  });
}

module.exports = initialize;
