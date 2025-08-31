import express from "express";
import session from "express-session";
import Flash from "connect-flash";
import passport from "passport";
import { fileURLToPath } from "url";
import path from "path";
import passportConfig from "./config/passport.js";
import userRouter from "./routes/userRoutes.js";
const app = express();
//+++++++++++++++++++++++++++++ importing section++++++++++++++++++++++
import connectDB from "./config/db.js";
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/////////////////////////// middleware difining //////////////////////
app.set("view engine", "ejs");
////////////////////////////////////////////////////////////////////////
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// 🔥 Flash setup
app.use(Flash());
// flash message setup

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error"); // passport failure ke liye
  next();
});

//--------------------------use config------------------------------------
connectDB();

app.use("/", userRouter);
//-------------------------------------------------------------------------

const PORT = process.env.PORT_NUMBER || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
