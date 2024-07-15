module.exports = {
  ensureAuthenticated: (req, res, next) => {
    // console.log('Checking authentication status');
    console.log('Auth____Session ID:', req.sessionID);
    // console.log('User:', req.user);
    // if (req.isAuthenticated()) {
    //   return next();
    // }
    console.log("req.session.userId on middleware",req.session.userId);
    console.log("req.session on middleware",req.session);

    if (req.session && req.session.userId) {
      // Optionally, you can verify the user data further here
      return next();
    }

    res.status(401).json({ message: 'Unauthorized access' });
  }
};
