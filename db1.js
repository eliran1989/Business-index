var express = require('express');
var router = express.Router();

const mongoDB = require('./db.js');
var Types = mongoDB.Types, Business = mongoDB.Business, db = mongoDB.db;


router.get('/set/:id', function(req, res, next) {
  let id = req.params.id;
  var t = new Types ({ gsx$type: id });
  t.save(function (err, type) {
    if (err) next ({ message: err})
    res.send ("<h1>" + id + "</h1>");
  });
})


router.get('/set1', function(req, res, next) {
    var a = 'סטודיו "דה בייס" סטודיו מקצועי, הראשון והיחיד בעיר לריקודי רחוב וסגנון ההיפ הופ בפרט,',
    b = "בהנהלת נטלי מלין. מתאים לכל הרמות וכל הגילאים לפי קבוצות החל מכיתה א' ועד גיל 20+"
    let obj = {
        gsx$type: "61183d936a1cf80ca85fbe62",
        gsx$name: "דה בייס",
        gsx$logo: "https://res.cloudinary.com/foodies/image/upload/v1626119448/Github/61421310_2948143198561616_2375046408504868864_n.jpg",
        gsx$logoheight: 200,
        gsx$logowidth: 300,
        gsx$address: "שומרון 4",
        gsx$city: "נוף הגליל", 
        gsx$phone :  "0508118216",
        gsx$facebook :  "https://www.facebook.com/TheBassHipHopDance",
        gsx$instagram :  "https://www.instagram.com/thebass.official/",
        gsx$whatsapp :  "0508118216",
        gsx$desc :  a+b,
        gsx$link : "0",
        gsx$active: true
    }
    
    var t = new Business (obj);
    t.save(function (err, type) {
      if (err) next ({ message: err})
      res.send ("<h1>OK</h1>");
    });
  })
  
module.exports = router;
