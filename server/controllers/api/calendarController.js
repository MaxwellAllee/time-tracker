const calendarController = require('express').Router();

const { JWTVerifier } = require('../../lib/passport');
const github = require('../../lib/github')

calendarController.get('/:week/:day', JWTVerifier, (req, res) => {
    const date ={
        week: req.params.week,
        day: req.params.day
    }
    github(date)
    .then(calendar=>{
        if(calendar !== "there was an error"){
            res.json(calendar)
        }else{
            res.sendStatus(500)
        }
    })
});

module.exports = calendarController;