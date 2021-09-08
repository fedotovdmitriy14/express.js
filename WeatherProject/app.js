
const express = require("express");
const https = require("https");              //не нужно устанавливать через node, так как это нативный модуль 
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {               //это как будто url, а в функции - вьюха

    res.sendFile(__dirname + "/index.html");

  

    
});

  app.post("/", function(req, res) {
        const city = req.body.cityName                              //вычленяем введенный город. cityName - это name инпута                     
        const apiKey = "0daa79d95431c9a14da550e1c9cc56d8"
        const unit = "metric"

        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit;

        https.get(url, function(response){              //называем reponse, так как res уже есть. URL b что с ним делать (в функции)
            console.log(response.statusCode);

            response.on("data", function(data){             //парсим JSON. data - информация которую мы получаем, функция - что с ней делать 
                const WeatherData = JSON.parse(data)        //сохраняем все данные в эту переменную. JSON пишем, так как без него это другой код
                const temp = WeatherData.main.temp          //обращаемся к конкретным данным так (путь можно найти через расширение JSON awesome)
                const description = WeatherData.weather[0].description
                console.log(temp, description)
                const icon = WeatherData.weather[0].icon
                const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
                res.write("<p>The weather is currently: " + description + "</p>")
                res.write("<h1>The weather in " + city +" is " + temp + " degrees Celcius</h1>")
                res.write("<img src=" + imageURL + "></img>")
                res.send()
            })
        })
    });



app.listen(3000, function() {
    console.log("The server is up and running")
})