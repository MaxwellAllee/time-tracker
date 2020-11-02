const usersController = require('express').Router();

const db = require('../../models');
const { JWTVerifier } = require('../../lib/passport');
const jwt = require('jsonwebtoken');

usersController.post('/', (req, res) => {
  const { email, password } = req.body;

  db.User.create({ email, password })
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

usersController.get('/me', JWTVerifier, (req, res) => {
  const userInfo = {email: req.user.email, week: req.user.week, day: req.user.day, activity: req.user.activity}
  res.json(userInfo);
});

usersController.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.User.findOne({ where: { email } })
    .then(user => {
      if (!user || !user.comparePassword(password)) {
        return res.status(401).send("Unauthorized");
      }

      res.json({
        token: jwt.sign({ sub: user.id }, process.env.JWT),
        user
      });
    });
});
usersController.put('/', JWTVerifier, (req, res)=>{
  console.log(req.body.type, req.body.number,"<====")
  
  db.User.update(
    {[req.body.type]: req.body.number },
    {where: {id:req.user.id}}
  )
  .then(results=>{
    console.log(results)
    res.sendStatus(200)
  })
  .catch(()=>{
    res.sendStatus(400)
  })
})


module.exports = usersController;
