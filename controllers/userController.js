const db = require ('../models/index');
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
    if (req.params.userId) {
        await User.findOne({where: {userId : req.params.userId}})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
    }else res.status(400).json({message: "User not found"})
}

module.exports = {
    login,
    profile,
}