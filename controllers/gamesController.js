const db = require('../models/index');
const Game = db.Game;

gamesList = async function(req, res) {
    await Game.findAll()
    .then(data => {
        console.log ("All games", JSON.stringify(data, null, 2));
        res.json({games : data, admin: req.admin});
    }).catch(err => {
        res.status(500).json({message : err.message});
    })
}

gameCreate = async function(req, res) {
    let game = Game.build({
        homeTeam: req.body.homeTeam,
        awayTeam: req.body.awayTeam,
        homeScore: req.body.homeScore,
        awayScore: req.body.awayScore,
        competition: req.body.competition,
        date: req.body.date,
        time: req.body.time
    })
    await game.save()
    .then(data => {
        console.log(game.toJSON())
        res.json(data);
    }).catch(err => {
        res.status(500).json({message : err.message})
    })
}

gameFindOne = async function(req, res) {
    if (req.params.gameId) {
        await Game.findOne({ where: {gameId : req.params.gameId}})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({message : err.message})
        })
    }else res.status(400).json({message:"Game not found"})
}

gameUpdate = async function(req,res) {
    console.log('heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
    if (req.params.gameId > 0) {
        await Game.update(
            {homeScore : req.body.homeScore,
            awayScore: req.body.awayScore},
            {where: {gameId : req.params.gameId}}
        ).then(data => {
            if(data[0]==0) {res.status(400).json({message:'Game not found'})}
            else res.json({message:'Game updated'})
        }).catch (err => {
            res.status(500).json({message: err.message})
        })
    }
}

module.exports = {
    gamesList,
    gameCreate,
    gameUpdate,
    gameFindOne
}