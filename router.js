const express = require('express');
const userController = require('./controllers/userController');
const articlesController = require('./controllers/articlesController')
const gamesController = require('./controllers/gamesController');
const { User } = require('./models');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.get('/', (req,res) => res.redirect('/articles'));

// ARTICLES
router.get('/articles', isAuthorized, articlesController.articlesList);
router.post('/article',isAuthorized, articlesController.articleCreate);
router.get('/article/:articleId', articlesController.articleFindOne);
router.put('/article/:articleId', articlesController.articleUpdate);
router.delete('/article/:articleId', articlesController.articleDelete);

// GAMES
router.get('/games', isAuthorized, gamesController.gamesList);
router.post('/games', gamesController.gameCreate);
router.get('/game/:gameId', isAuthorized, gamesController.gameFindOne);
router.put('/game/:gameId', isAuthorized, gamesController.gameUpdate);

// USER

// router.post('/login', userController.login);
router.post('/login', async function (req,res, next){
    const jwtKey = "my_secret_key"
    const jwtExpirySeconds = 300

    let payload = {userId : req.body.userId, admin : req.body.admin};
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
                req.userId = payload.userId;
                req.admin = payload.admin;
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

router.put('/annualPlace/:userId', userController.annualPlace);
router.get('/username/:userId',userController.username);




module.exports = router;