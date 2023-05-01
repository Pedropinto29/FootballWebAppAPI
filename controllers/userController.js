const db = require ('../models/index');
const { post } = require('../router');
const User = db.User;

login = async function(req, res){
    let user = User.build({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        annualPlace: req.body.annualPlace,
        admin: req.body.admin,
    })
    await user.save()
    .then(data => {
        console.log(user.toJSON());
        res.json(data);
    }).catch(err => {
        res.status(500).json({message : err.message})
    })
}

profile = async function (req,res) {
    if (req.userId) {
        await User.findOne({where: {userId : req.userId}})
        .then(data => {
            console.log(data)
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
    }else res.status(400).json({message: "User not found"})
}

userExists = async function (req,res) {
    console.log(req.body.username)
    if (req.body.username && req.body.password) {
        await User.findOne({where: {username : req.body.username, password : req.body.password}})
        .then(data => {
            console.log(data)
            res.json(data);
            return data
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
    }else res.status(400).json({message: "User not found"})
}

module.exports = {
    login,
    profile,
    userExists
}