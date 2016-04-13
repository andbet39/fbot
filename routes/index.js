var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === 'password01') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

module.exports = router;
