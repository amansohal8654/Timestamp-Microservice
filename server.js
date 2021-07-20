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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello Amandeep'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

const response = {};

app.get("/api/:date", (req, res) => {
  let{date} = req.params;
  if(parseInt(date) < 10000){
    response["unix"] = new Date(date).getTime();
    response["utc"] = new Date(date).toUTCString();
  }
  else{
    date = parseInt(date);
    response["unix"] = date;
    response["utc"] = new Date(date).toUTCString();
  }
  if(!response["unix"] || !response["utc"]){
    return res.json({ error : "Invalid Date" })
  }
 res.json(response);
})


app.get("/api", (req, res) => {
  response["unix"] = new Date().getTime();
  response["utc"] = new Date().toUTCString();
  res.json(response);
})