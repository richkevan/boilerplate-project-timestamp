// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
// app.get("/api/hello", function (req, res) {
//   res.json({greeting: 'hello API'});
// });

// app.get("/api/currenttime",(req, res) => {
//   let time = {localDateTime: Date(), unix: Date.now(), utc:  new Date().toUTCString()}
//   res.json(time)
// })
app.get('/api/:utc([0-9]{4}-[0-9]{2}-[0-9]{2})', (req, res) => {
  let utcTime = new Date(req.params.utc.split(' ')).toUTCString()
  let unixTime = Date.parse(utcTime)
  res.json({ unix: unixTime, utc: utcTime })
})

app.get('/api/:unix([0-9]{10,})', (req, res) => {
  let unixTime = new Date(parseInt(req.params.unix))
  let utcTime = unixTime.toUTCString()
  res.json({ unix: parseInt(req.params.unix), utc: utcTime })
})

app.get('/api/:date(*)', (req, res) => {
  console.log(req, new Date(req.params.date), Date.parse(req.params.date))
  if (new Date(req.params.date) != 'Invalid Date') {
    time = new Date(req.params.date)
    res.json({unix: time, utc: time.toUTCString()})
}
  else if (new Date(req.params.date) == 'Invalid Date') {
    res.json({error:'Invalid Date'})
  }  
  else {
    time = Date.now()
    res.json({unix: time, utc: new Date(time).toUTCString()})
  }
})



// listen for requests :)
app.set('port', process.env.PORT || 10000);
var listener = app.listen(app.get('port'), function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
