const express = require('express');
const userController = require('./controllers/userController');
const articlesController = require('./controllers/articlesController')
const gamesController = require('./controllers/gamesController');
const router = express.Router();

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
router.post('/login', userController.login);
router.get('/profile/:userId',userController.profile);

module.exports = router;