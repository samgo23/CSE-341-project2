const isAuthenticated = (req, res, next) => {
  if (req.session.user !== undefined) {
    return res.status(401).json({ error: 'Must be logged in.' });
  }
  next();
};

module.exports = { isAuthenticated };
