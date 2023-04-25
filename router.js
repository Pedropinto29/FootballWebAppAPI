const express = require('express');
const userController = require('./controllers/userController');
const articlesController = require('./controllers/articlesController')
const gamesController = require('./controllers/gamesController');
const { User } = require('./models');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.get('/', (req,res) => res.redirect('/articles'));

// ARTICLES
router.get('/articles', articlesController.articlesList);
router.post('/articles', articlesController.articleCreate);
router.get('/article/:articleId', articlesController.articleFindOne);
router.put('/article/:articleId', articlesController.articleUpdate);
router.delete('/article/:articleId', articlesController.articleDelete);

// GAMES
router.get('/games', gamesController.gamesList);
router.post('/games', gamesController.gameCreate);
router.put('/game/:gameId', gamesController.gameUpdate);

// USER

// router.post('/login', userController.login);
router.post('/login', async function (req,res, next){
    const jwtKey = "my_secret_key"
    const jwtExpirySeconds = 300

    let payload = {user : req.body.userId};
    let token = jwt.sign(payload,jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
    })
    res.json({"token" : token, "maxAge": jwtExpirySeconds * 1000});
});

function isAuthorized(req,res,next){
    if (typeof req.headers.authorization !== "undefined"){
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, "my_secret_key", (err,payload) => {
            if (err) {
                res.status(401).json({error : "Not Authorized"});
            } else {
                req.userId = payload;
                return next();
            }  
        })
    }
    else {
        res.status(403).json({error : "Nothing sent"});
    }
}

router.get('/profile',isAuthorized ,userController.profile);
router.post('/userExists', userController.userExists);




module.exports = router;