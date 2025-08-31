import passport from "passport";
import User from "../models/user.js";



passport.use(User.createStrategy());
passport.deserializeUser(User.deserializeUser());
passport.serializeUser(User.serializeUser());


export default passport;