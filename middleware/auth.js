module.exports = {
  ensureAuthenticated: (req, res, next) => {
    // console.log('Checking authentication status');
    console.log('Auth____Session ID:', req.sessionID);
    // console.log('User:', req.user);
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: 'Unauthorized access' });
  }
};
