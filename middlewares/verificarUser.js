module.exports = (req, res, next) => {
  // isAuthenticated viene de password verifica si el usuario tiene una session activa
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/auth/login')  
}