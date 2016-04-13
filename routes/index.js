var express = require('express');
var router = express.Router();
var request = require('request');

var token = "CAALfWqYMPEkBANA7LZAkNLgVjHDQbfux7helSy2yTj1Y3gl7OlkTnOXeTAPNQM3h3b5Fdd8WEyZCzZCJCmIb23zJJTYhwzvkPrcQcRUR2cxfb2bl8Ho5lzqvSirb2ZCwaEeKh4Qmt0fSrblv0zPuOiL34qvdlJEclJRouWf2kU1ZAAp3ZBLbBHjAZBxNHXIMOgZD";

var sendTextMessage = function (sender, text) {
  console.log("Sto rispondendo");
  messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

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

router.post('/webhook/', function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      console.log(sender,text);
      sendTextMessage(sender,"Bot creato da Andrea!!!");
      sendTextMessage(sender,"Al momento sono un pappagallo :" + text);
    }
  }
  res.sendStatus(200);
});


module.exports = router;
