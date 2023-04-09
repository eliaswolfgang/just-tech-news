const router = require('express').Router();
const passport = require('../../config/passport');

const { User, Post, Vote, Comment } = require('../../models');

router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'post_url', 'createdAt'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'createdAt'],
        include: {
          model: Post,
          attributes: ['title'],
        },
      },
      {
        model: Post,
        attributes: ['title'],
        through: Vote,
        as: 'voted_posts',
      },
    ],
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'post_url', 'createdAt'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'createdAt'],
        include: {
          model: Post,
          attributes: ['title'],
        },
      },
      {
        model: Post,
        attributes: ['title'],
        through: Vote,
        as: 'voted_posts',
      },
    ],
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((data) => {
    if (!data) {
      res
        .status(400)
        .json({ message: 'No user found with that email address' });
      return;
    }
    if (!data.checkPassword(req.body.password)) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }
    res.json({ user: data, message: `Logged in as ${data.username}` });
  });
});

router.put('/:id', (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'No user found with this id' });
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
