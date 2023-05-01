const db = require('../models/index');
const Article = db.Article;

articlesList = async function(req,res) {
    console.log(req.admin)
    await Article.findAll()
    .then(data => {
        console.log('All articles', JSON.stringify(data,null,2));
        res.json({articles : data, admin : req.admin});
    }).catch(err => {
        res.status(500).json({message : err.message});
    })
}

articleCreate = async function(req, res) {
    console.log("heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", req.userId)
    let article = Article.build({title: req.body.title, subtitle: req.body.subtitle, body: req.body.body, user: req.userId})
    await article.save()
    .then(data => {
        console.log(article.toJSON());
        res.json(data);
    }).catch(err=> {
        res.status(500).json({message : err.message})
    })
}

articleFindOne = async function(req, res) {
    if (req.params.articleId) {
        await Article.findOne({ where: {articleId : req.params.articleId}})
        .then(data =>{
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message})
        })
    }else res.status(400).json({message: "Article not found"})
}

articleUpdate = async function(req,res) {
    if (req.params.articleId > 0) {
        await Article.update(
            {title: req.body.title, subtitle: req.body.subtitle, body: req.body.body},
            {where: {articleId : req.params.articleId}}
        ).then(data => {
            if(data[0] == 0) {res.status(400).json({message:'Article not found'})}
            else res.json({message: 'Article updated'})
        }).catch (err => {
            res.status(500).json({message: err.message})
        })
    }
}

articleDelete = async function(req,res) {
    if (req.params.articleId) {
        await Article.destroy({where: {articleId: req.params.articleId}})
        .then(data => {
            if (data==0) res.status(400).json({message: 'Article not found'})
            else res.json(data);
        }).catch(err => {
            res.status(500).json({message: err.message})
        })
    }
    else res.status(400).json({ message: 'Article not found'})
}



module.exports = {
    articlesList,
    articleCreate,
    articleFindOne,
    articleUpdate,
    articleDelete,
}