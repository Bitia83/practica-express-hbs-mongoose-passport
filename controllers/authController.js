const User = require("../models/User");
const {nanoid} = require('nanoid')

const registerForm = (req, res) => {
  res.render('register')
 
}

const registerUser = async (req, res) => {
  console.log(req.body);
  const {userName, email, password} = req.body
  try {
    let user = await User.findOne({ email: email })
    if(user) throw new Error('ya existe usuario')
   
    user = new User({ userName, email, password, tokenConfirm: nanoid() });
    await user.save();

  // enviar correo electronico con la confirmacion de la cuenta

    res.redirect('/auth/login');
    // res.json(user);
    

  } catch (error) {
    res.json({ error: error.message });
  } 
}
const confirmarCuenta = async (req, res) => {
  const { token } = req.params;
  try {
    
    const user = await User.findOne({ tokenConfirm: token })
    if (!user) throw new Error('usuario no existe');
    user.cuentaConfirmada = true
    user.tokenConfirm = null
    await user.save();

    res.redirect('/auth/login')

  } catch (error) {
    
    res.json({error: error.message})
  }
}


 const loginForm = (req, res) => {
   res.render('login');
 }
module.exports = {
  loginForm,
  registerForm,
  registerUser,
  confirmarCuenta
}