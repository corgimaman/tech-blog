const router = require('express').Router();
const { User } = require('../../models');


// make a new user
// router.post('/', async (req, res) => {
//   try {
//     User.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password
//     }).then((data) => {
//       req.session.save(() => {
//         req.session.user_id = data.id;
//         req.session.name = data.name;
//         req.session.logged_in = true;
  
//         res.status(200).json(data);
//     })
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.post('/', (req,res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).then(userData => {
    req.session.save(()=> {
      req.session.user_id = userData.id,
      req.session.name = userData.name,
      req.session.logged_in = true;

      res.json(userData);
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
})

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    console.log('\n\n\n\n\n')
    console.log('we recieved login route!!!')
    console.log(userData)
    console.log('\n\n\n\n\n')

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.name = userData.name;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
    console.log("hit logout route!!!1")
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;