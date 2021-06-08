const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get routes
router.get('/', async (req, res) => {
    try {
      const commentData = await Comment.findAll({
        include: [{all: true}],
      });
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
});
  
router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id, {
        include: [{all: true}],
        });
        res.status(200).json(commentData);
    } catch(err) {
        res.status(500).json(err);
    }
});

// make new comments:
router.post('/', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// update comment:
router.put('/:id', withAuth, async (req, res) => {
    try {
      Comment.update(
        {
          comment: req.body.comment
        },
        {
          where: {
            id: req.params.id,
          },
        }
      ).then(commentData => {
        if (!commentData) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
        }
        res.json(commentData);
      })
    } catch (err) {
      res.status(500).json(err);
    }
  });

// delete comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
module.exports = router;