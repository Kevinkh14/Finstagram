const bcrypt = require("bcryptjs");

module.exports = {
  getUser: async (req, res) => {
    if (req.session.user) {
      const { user_id } = req.session.user;
      const db = req.app.get("db");

      const foundUser = await db.auth.getUserData(user_id);
      req.session.user = {
        user_id: foundUser[0].user_id,
        username: foundUser[0].username,
        name: foundUser[0].name,
        email: foundUser[0].email,
        profile_pic: foundUser[0].profile_pic
      };
      res.status(200).json(req.session.user);
    }
  },

  registerUser: async (req, res) => {
    const { username, email, name, password, profile_pic,following,followers } = req.body;
    const db = req.app.get("db");

    const foundUser = await db.auth.checkForTakenUsername(username, email);
    console.log(+foundUser[0].count)
    if (+foundUser[0].count === 0) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = await db.auth.register(
        username,
        email,
        name,
        hash,
        profile_pic,
        following,
        followers
      );
      req.session.user = {
        username,
        email,
        name,
        profile_pic,
        following,
        followers
      };
      res.status(200).json(req.session.user);
    } 
    else {
      res.status(409).json("Username Taken");
      console.log('user taken')
    }
  },
  loginUser: async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get("db");
    const foundUser = await db.auth.getPassword(username);

    if (!foundUser[0]) {
      res.status(403).json("Username or Password incorrect");
    } else {
      const isAuthenticated = bcrypt.compareSync(
        password,
        foundUser[0].password
      );
      if (!isAuthenticated) {
        res.status(403).json("Username or Password Incorrect");
      } else {
        req.session.user = {
          user_id: foundUser[0].user_id,
          username: foundUser[0].username,
          name: foundUser[0].name,
          email: foundUser[0].email,
          profile_pic: foundUser[0].profile_pic,
          following: foundUser[0].following,
          followers:foundUser[0].followers
        };
        res.status(200).json(req.session.user);
        console.log(foundUser)
      }
    }
  },
  logout: function(req, res) {
    req.session.destroy();
    return res.sendStatus(200);
  }
};
