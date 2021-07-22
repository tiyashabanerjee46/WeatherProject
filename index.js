const bodyparser = require("body-parser");
const express = require("express");
const app = express();
const https = require("https");
app.use(bodyparser.urlencoded({extended:true}));


app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    var city_name = req.body.city;
    https.get("https://api.openweathermap.org/data/2.5/weather?appid=61247373edd6d7946f9b1b4c46a2df2a"+ city_name+"&units=metric",function(response){
        response.on("data",function(data){
            var data_value = JSON.parse(data);
            var img_src = "http://openweathermap.org/img/wn/"+data_value.weather[0].icon+"@2x.png";
            res.write("<p>today weather is "+data_value.weather[0].description+ " </p>");
            res.write("<h1>in " + city_name+" today "+data_value.main.temp+" celcius</h1>");
            res.write("<img src="+img_src+">")
            res.send();
        });
    });

});




// app.listen(process.env.PORT ||3000, function(){
//     console.log("server started");
// });
