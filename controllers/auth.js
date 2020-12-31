const User = require("../models/user");
const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("login", {
    pageTitle: "Login",
    bodyTitle: null,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then((userExist) => {
    if (!userExist) {
      return res.redirect("/login");
    }
    bcrypt
      .compare(password, userExist.password)
      .then((passwordMatch) => {
        if (passwordMatch) {
          req.session.isLoggedIn = true;
          req.session.user = userExist;
          return req.session.save((err) => {
            console.log(err);
            res.redirect("/");
          });
        }
        res.redirect("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.getAdminLogin = (req, res, next) => {
  res.render("login", {
    pageTitle: "Admin Login",
    bodyTitle: "Admin",
  });
};

exports.postAdminLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  Admin.findOne({ email: email }).then((userExist) => {
    if (!userExist) {
      return res.redirect("/login");
    }
    bcrypt
      .compare(password, userExist.password)
      .then((passwordMatch) => {
        if (passwordMatch) {
          req.session.isLoggedIn = true;
          req.session.user = userExist;
          return req.session.save((err) => {
            console.log(err);
            res.redirect("/");
          });
        }
        res.redirect("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getSignUp = (req, res, next) => {
  res.render("register", {
    pageTitle: "Register",
  });
};

exports.postSignUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const cPassword = req.body.cpassword;
  const name = req.body.name;
  const phoneno = req.body.phoneno;
  User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((encryptPassword) => {
          const user = new User({
            email: email,
            password: encryptPassword,
            name: name,
            phoneno: phoneno,
          });
          return user.save();
        })
        .then((result) => {
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getDashboard = (req, res, next) => {
  res.render("index", {
    pageTitle: "Dashboard",
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};
