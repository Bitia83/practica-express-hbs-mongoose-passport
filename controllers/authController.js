const User = require("../models/User");
const { nanoid } = require('nanoid');
const { validationResult } = require('express-validator');


const registerForm = (req, res) => {
  res.render('register', {mensajes:req.flash("mensajes")})
 
}

const registerUser = async (req, res) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.flash("mensajes", errors.array())
    return res.redirect('/auth/register')

    // return res.json(errors);
  }
  
  const {userName, email, password} = req.body
  try {
    let user = await User.findOne({ email: email })
    if(user) throw new Error('ya existe usuario')
   
    user = new User({ userName, email, password, tokenConfirm: nanoid() });
    await user.save();

  // enviar correo electronico con la confirmacion de la cuenta
       req.flash("mensajes", [{msg: "revisa tu correo y valida cuenta"}])
    res.redirect('/auth/login');
    
  } catch (error) {
    req.flash("mensajes", [{msg: error.message}])
    return res.redirect('/auth/register')
    // res.json({ error: error.message });
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

    req.flash("mensajes", [{msg: "cuenta verificada puedes iniciar sesion"}])

    return res.redirect('/auth/login')

  } catch (error) {
    req.flash("mensajes", [{msg: error.message}])
    return res.redirect('/auth/login')
    // res.json({error: error.message})
  }
}




 const loginForm = (req, res) => {
   res.render('login',{mensajes:req.flash("mensajes")});
}



const loginUser = async (req, res) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.flash("mensajes", errors.array())
    return res.redirect('/auth/login')
  }

  const { email, password } = req.body;
  try {

    const user = await User.findOne({ email })
    
    if (!user) throw new Error('no existe email')
    if (!user.cuentaConfirmada) throw new Error('falta confirma cuenta');
    if (await user.comparePassword(password)) throw new Error('password invalido')

    res.redirect('/');
    
  } catch (error) {
    req.flash("mensajes", [{msg: error.message}])
    return res.redirect('/auth/login')
   
    // console.log(error)
    // res.send(error.message)
  }
}



module.exports = {
  loginForm,
  registerForm,
  registerUser,
  confirmarCuenta,
  loginUser
}