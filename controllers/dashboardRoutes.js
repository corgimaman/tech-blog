const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/home', withAuth, async (req, res) => {
     console.log("\n\n\n\nI am here in dashboard routes\n\n\n\n");
    try {
        const postData = await Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        // attributes: { exclude: 'user_id' }
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
        posts,
        logged_in: req.session.logged_in
    });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, async (req,res) => {
    try {
        const singlePost = Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: { exclude: 'user_id' }
    });
    if(!singlePost) {
        res.status(404).json({message: 'No post found with this id!'});
        return;
    }
    const post = singlePost.get({plain: true});
    res.render('post', {
        post,
        logged_in: req.session.logged_in
    });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/new', withAuth, async (req, res) => {
    res.render('new', {
       logged_in: req.session.logged_in 
    });
});

module.exports = router;