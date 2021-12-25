var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const mongoDB = require('./db.js');
var Types = mongoDB.Types, Business = mongoDB.Business, db = mongoDB.db;

async function Q (req, res, next, callback) {
  var userAgent = req.headers['user-agent'];     // user-agent header from an HTTP request
  try {
    let val = { };
    val.ua = userAgent;
    val.businesses = await Business.find ({});
    val.types = await Types.find ({});
    return callback (val, res);
  }
  catch (err) {
    //return res.status(404).json(error);
    return next({ message: err })
  }
}

/*function Q1 (req, res, next, callback) {
  var userAgent = req.headers['user-agent'];     // user-agent header from an HTTP request
  var arr = [Business, Types]
  return Promise.all(
    arr.map(table =>
      table.find ({})
      .then (types => types)
      .catch (err => err)
    ))
    .then((value) => {
      let val = { };
      val.businesses = value[0];
      val.types = value[1];
      val.ua = userAgent;
      return callback (val, res);
      //return res.json (val);
    })
    .catch((err) => {
      var error = { }
      error.err1 = err[0];
      error.err2 = err[1];
      //return res.status(404).json(error);
      return next(error)
    })
}*/

router.get('/a1', function(req, res, next) {

  Types.find ({ })
  .then(data => {
      res.render("./Components/Q", {types: data});
  })
  .catch(err => next ({ message: err}))

})

router.get('/businessEditor', function(req, res, next) {
  Q (req, res, next, function (val, res) {
      res.render("./Components/BusinessEditor", val)
      //res.send ("QW");
  })
})

router.put('/businessUpdate', function(req, res, next) {

  let data = req.body.data;
  //delete data.__v;

  Business.findOneAndUpdate ({ _id: data.id }, data.val)
  .then(data => {
    res.send (true);
  })
  .catch(err => res.status(404).json(err))

});


router.put('/businessCreate', function(req, res, next) {

  let data = req.body.data;

  let newBusiness = new Business (data);

  newBusiness.save ()
  .then(data => {
    res.send (data);
  })
  .catch(err => res.status(404).json(err))

});

/*-------------------------------------------------------*/
router.get('/typesEditor', function(req, res, next) {

  Types.find ({ })
  .then(data => {
      res.render('./Components/TypesEditor', {types: data});
  })
  .catch(err => next ({ message: err}))

});


router.post('/addnewtype', function(req, res) {

  //console.log (req.body.data);
  //res.send ({OK:"OK"});

  Types.create ({gsx$type: req.body.data })
  .then(data => {
    res.send (data);
  })
  .catch(err => res.status(404).json(err))

});

router.put('/updatetype', async function(req, res) {

  console.log (req.body.data.id);
  //res.send ({OK:"OK"});

  await Types.findOneAndUpdate ({ _id: req.body.data.id }, {gsx$type: req.body.data.val})
  .then(data => {
    res.send (true);
  })
  .catch(err => res.status(404).json(err))

});

router.put('/deletetype', async function(req, res) {

  console.log (req.body.data);
  var businesses = await Business.find ({ "gsx$type": req.body.data });
  console.log ("businesses.length: " + businesses.length);
  if (businesses.length > 0) res.status(404).json (false);

  else {
    await Types.findOneAndDelete ({ _id: req.body.data })
    .then(data => {
      res.send (true);
    })
    .catch(err => res.status(404).json(err))
  }

});

/*-------------------------------------------------------*/
router.get('/', function(req, res, next) {
  Q (req, res, next, function (val, res) {
    val.businesses = val.businesses.filter (e => e.gsx$active != false);
    res.render('./Components/HomePage', val);
  })
})

router.get('/Q', function(req, res, next) {
  Q (req, res, next, function (val, res) {
    val.businesses = val.businesses.filter (e => e.gsx$active != false);
    res.render('./Components/HomePage1', val);
  })
})

router.post('/', function(req, res, next) {
  Q (req, res, next, function (val, res) {
    val.businesses = val.businesses.filter (e => e.gsx$active != false);
    res.send(val);
  })
    
});

router.post('/getBusinessesBySearch', function(req, res, next) {
  let searchText = req.body.searchText;
  if (searchText.trim() == '') res.status(404);
  else {
    query = {"$or": [
      {"gsx$name": { "$regex": searchText, "$options": "i" } }
    ]}
  
    Business.find (query)
      .then(data => {        
        //arr = filterKeysOfArrayOfObjects ('gsx$', arr);
        //arr = filterArrayOfObjects (searchText, arr);
        res.json (data)
      })
	    .catch(err => res.status(404).json(err))
  }    

});

router.get('/page/:id', function(req, res, next) {
  var userAgent = req.headers['user-agent'];

  let id = req.params.id;
  Business.findOne ({ gsx$link: id })
  .then(data => {
    console.clear;
    console.log (data);
    if (data == null) next ({ status: 404, message: "הדף לא קיים"})
    else res.render('./Components/Itemdata', { data: data, ua: userAgent });
  })
  .catch(err => {
    console.log (err);
    res.status(404).json(err)
  })

});

/*-------------------------------------------------------*/
router.get('/*', function(req, res, next) {
  next ({ status: 404, message: "הדף לא קיים"})
  //next ({message: "הדף לא קיים"})
})
/*-------------------------------------------------------*/

/*router.post('/getTypes', function(req, res, next) {
  let href = "https://spreadsheets.google.com/feeds/list/18GAUw1YmWC2pcCug6jqU_atcIn51fQSrDLNmcuqdoP8/oye0vyq/public/values?alt=json"
  fetch(href)
      .then(response => response.json())
      .then(data => { res.json (data) })
	    .catch(err => res.status(404).json(err))
});

router.post('/getBusinesses', function(req, res, next) {
  let href = "https://spreadsheets.google.com/feeds/list/18GAUw1YmWC2pcCug6jqU_atcIn51fQSrDLNmcuqdoP8/od6/public/values?alt=json"
  fetch(href)
      .then(response => response.json())
      .then(data => { res.json (data) })
	    .catch(err => res.status(404).json(err))
});*/



function filterKeys(prefix, obj) {
  return Object.entries(obj).reduce((res, [key, value]) => {
      if (key.startsWith(prefix)) {
          res[key] = value;
      }
      return res;
  }, {});
}


function filterKeys1(suffix, obj) {
  return Object.entries(obj).reduce((res, [key, value]) => {
      if (suffix.some (e => key.endsWith(e)) ) {
          res[key] = value;
      }
      return res;
  }, {});
}

function filterKeysOfArrayOfObjects1 (suffix, arr) {
  return arr.map (e => filterKeys1 (suffix, e));
}

function filterKeysOfArrayOfObjects (prefix, arr) {
  return arr.map (e => filterKeys (prefix, e));
}

function filterArrayOfObjects (tags, arr) {
  return arr.filter(obj => {
    return Object.values(filterKeys1 (['name', 'desc', 'desc2'], obj)).some (e => e.includes (tags)) 
  })
}


Object.isEmpty = (val) => Object.keys(val).length === 0;

module.exports = router;
