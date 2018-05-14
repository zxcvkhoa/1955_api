var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");


app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, "./static")));
app.set("views", path.join(__dirname, "./views"));


var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/1955");

var Schema = mongoose.Schema;

var Schema1955 = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


mongoose.model("People", Schema1955);


var People = mongoose.model("People");


mongoose.Promise = global.Promise;

//---------------------------------------------------------------------

app.get('/', function(req, res){
    People.find({}, function(err, data){
        if(err){
            console.log(err);
            res.json({
                message: "Error",
                error: error
            });
        } else {
            console.log(data);
            res.json({
                message: "Success",
                data: data
            });
        };
    });
});

app.get("/new/:name", function(req, res){
    console.log(req.params.name);
    var person = new People({
        name: req.params.name
    });
    person.save(function (err){
        if(err){
            console.log(err);
            response.json({
                message: "Error",
                error: error
            });
        } else {
            console.log("Successfully created and saved a new person");
            res.redirect('/');
        };
    });
});

app.get("/remove/:name", function(req, res){
    console.log(req.params.name);
    People.remove({
        name: req.params.name
    }, function(err){
        if (err){
            console.log(err);
            res.json({
                message: "Error",
                error: error
            });
        } else {
            console.log("Successfully removed this person");
            res.redirect('/')
        };
    });
});

app.get("/:name", function(req, res){
    console.log(req.params.name);
    People.find({
        name: req.params.name
    },
    function(err, data){
        if(err){
            console.log(err);
            res.json({
                message: "Error",
                error: error
            });
        } else {
            console.log(data);
            res.json({
                message: "Success",
                data: data
            });
        };
    });
});





app.listen(8000, function(){
    console.log("listening on port 8000");
})