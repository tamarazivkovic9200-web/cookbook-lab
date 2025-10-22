const setUser = (req, res, next) => {
  res.locals.user = req.session.user || null; // available in all templates
  next();
};

module.exports = setUser;