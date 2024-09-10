const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')
const albumController = require('../controllers/albumController')

//router para las vistas
router.get('/', authController.isAuthenticated, (req, res)=>{    
    res.render('index', {user:req.user})
})
router.get('/login', (req, res)=>{
    res.render('login', {alert:false})
})
router.get('/register', (req, res)=>{
    res.render('register')
})

router.get('/alta', (req, res) => {
    res.render('index', { partial: 'partials/alta', user: req.user });
  });
    
router.get('/modificacion', (req, res) => {
    res.render('index', { partial: 'partials/modificacion', user: req.user });
  });
    
router.get('/baja', (req, res) => {
    res.render('index', { partial: 'partials/baja', user: req.user });
  });

//router para los métodos del controller
router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.post('/alta', albumController.altaAlbum);
router.post('/baja', albumController.bajaAlbum);
router.post('/modificacion', albumController.modificarAlbum);
module.exports = router