const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // get all posts and JOIN with user data
        console.log("\n\n\n\nI am here\n\n\n\n")
        const postData = await Post.findAll({ include: [ User ] });
        console.log('\n\n\n\n\n')
        console.log({postData})
        console.log('\n\n\n\n\n')
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try { 
        const singlePost = Post.findByPk(req.params.id, {
        attributes: [{all:true}],
        include: [
            User,
            {
                model: Comment,
                attributes: [{all:true}],
                include: [User]
            }
        ]
    });
    if(!singlePost) {
        res.status(404).json({message: 'No post found with this id!'});
        return;
    }
    const post = singlePost.get({ plain: true });
    res.render('post', {
        post,
        logged_in: req.session.logged_in
    });
    } catch (err) {
        res.status(500).json(err);
    }
});

// user login & register

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
    res.render('login');
});

router.get('/register', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
      }
    res.render('signup');
});

// dashboard routes

router.get('/dashboard', withAuth, async (req, res) => {
    try {Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: { exclude: 'user_id' }
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
        posts,
        logged_in: req.session.logged_in
    });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard/edit/:id', withAuth, async (req,res) => {
    try {
        const singlePost = Post.findByPk(req.params.id);
    if(!singlePost) {
        res.status(404).json({message: 'No post found with this id!'});
        return;
    }
    const post = singlePost.get({plain: true});
    res.render('edit', {
        post,
        logged_in: req.session.logged_in
    });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/dashboard/new', withAuth, async (req, res) => {
    res.render('new', {
       logged_in: req.session.logged_in 
    });
});

module.exports = router;