/**
 * Created by SARAL TECH on 2/17/2017.
 */

var express = require('express'), cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var port = 3000;



var app = express();

app.use(cors());
//View Engine

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

//Set Static Folder

app.use(express.static(path.join(__dirname,'client')));

//Body Parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use('/',index);
app.use('/api',tasks);

/*app.use(function (req,res,next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Method', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
});*/


app.listen(port,function () {
    console.log('Server started on port' + port);
});