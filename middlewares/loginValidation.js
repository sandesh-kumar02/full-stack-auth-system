
import { body, validationResult } from "express-validator";

const loginValidation = [
    body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash(
        "error_msg",
        errors
          .array()
          .map((err) => err.msg)
          .join(", ")
      );
      return res.redirect("/login");
    }
    next();
  },
];


export default loginValidation;