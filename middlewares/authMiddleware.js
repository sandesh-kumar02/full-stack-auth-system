export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();  // authenticated → next controller (profile)
  }
  res.redirect("/login");  // not authenticated → redirect
};
