const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get routes
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{all: true}],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{all: true}],
    });
    res.status(200).json(postData);
  } catch(err) {
    res.status(500).json(err);
  }
});


// make new posts:
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.post('/', withAuth, (req, res) => {
//   Post.create({
//     title: req.body.title,
//     body: req.body.body,
//     user_id: req.session.user_id
//   }).then(data => res.json(data)).catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   })
// })

// update post:
router.put('/:id', withAuth, async (req, res) => {
  try {
    Post.update(
      {
        title: req.body.title,
        body: req.body.body
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then(postData => {
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.json(postData);
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;