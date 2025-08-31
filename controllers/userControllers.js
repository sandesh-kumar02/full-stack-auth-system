import User from "../models/user.js";
import passport from "passport";

export const signupPage = (req, res) => {
  res.render("signup");
};

export const signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const newUser = await User.register({ username, email }, password);
    req.flash(
      "success_msg",
      "Account created successfully, you can login now!"
    );
    res.redirect("/login");
  } catch (error) {
    req.flash("error_msg", "Signup failed, try again!");
    res.redirect("/signup");
  }
};

export const loginPage = (req, res) => {
  res.render("login");
};

export const login = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login", 
    failureFlash: true, 
  })(req, res, next);
};

export const profile = (req, res) => {
  res.render("profile", { user: req.user });
};

export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      req.flash("success_msg", "You have logged out successfully!");
      return next();
    }
    res.redirect("/login");
  });
};

export const updateProfilePic = async (req, res) => {
  try {
    const user = req.user;
    if (!req.file) {
      req.flash("error_msg", "No file uploaded!");
      return res.redirect("/profile");
    }
    user.profilePic = "/uploads/" + req.file.filename;
    await user.save();
    req.flash("success_msg", "Profile picture updated!");
    res.redirect("/profile");
  } catch (err) {
    console.log(err);
    req.flash("error_msg", "Something went wrong!");
    res.redirect("/profile");
  }
};
