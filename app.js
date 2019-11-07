var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var multer = require('multer');
var path = require('path');


let = PORT = process.env.PORT || 8080;

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'news'
});
connection.connect(function (err) {
	if (err) throw err;
	console.log("database is connected");
});

var app = express();
app.set('view engine', 'ejs');
app.use(express.static("css"));
app.use(express.static("images"));
app.use(express.static("videos"));
app.use(express.static("js"));
app.use(express.static("uploads"));
app.use(express.static("posts"));
app.use(flash());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var storage1 = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, 'uploads/');
	},
	filename: function (req, file, callback) {
		callback(null, Date.now() + file.originalname);
	}
});
var upload = multer({ storage: storage1 });

app.get("/",function(req,res){
    res.render('index');
});


app.post("/sub",function(req,res){
    var name=req.body.name;
    var email=req.body.email;
    sql="insert into subscribe values(null,'"+name+"','"+email+"')";
    connection.query(sql, function (err) {
		if (err) throw err;
		res.redirect('/');
	    });
});

app.post("/cont",function(req,res){
    var name=req.body.name;
    var email=req.body.email;
    var phone=req.body.phone;
    sql="insert into contact values(null,'"+name+"','"+email+"','"+phone+"')";
    connection.query(sql, function (err) {
		if (err) throw err;
		res.redirect('/');
	    });
});








app.listen(PORT, function (err) {
	if (err) throw err;
	console.log(`Server is running at http://127.0.0.1:${PORT}`);
});