$(document).ready(function(){

    var searchHistory = [];

       function getItems(){
            var savedCities
           JSON.parse(localStorage.getItem("searchHistory"));
              if (savedCities !== null){
                  searchHistory = savedCities;
              };
           
          for(i = 0; 1< searchHistory.length; i++){
              if(i == 8){
                  break;
              }

            locationListButton = $("<a>").attr({
                class: "list-group-item list-group-item-action",
                href: "#"
             });

             locationListButton.text(searchHistory[i]);
             $(".list-group").append(locationListButton);

          }
       };

       var city;
       var mainCard = $(".card-body");

       getItems();
    

       function getData(){
           var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=cfd7298139fb45786d6fd71f01931c56"
           mainCard.empty()
           $("#weekly-forecast").empty();

           $.ajax({
               url: apiUrl,
               method: "GET"
           }).then(function(response){

              var date = moment().format(" MM/DD/YYYY");

              var icon = response.weather[0].icon;

              var iconUrl= "http://openweathermap.org/img/w/" + icon + ".png";

              var name = $("<h3>").html(city+date);

              mainCard.prepend(name);

              mainCard.append($("<img>").attr("src", iconUrl));

              var temp = Math.round((response.main.temp - 273.15) * 1.80 + 32);

              mainCard.append($("<p>").html("Temperature: " + temp + "&#8457"));

                   var humidity = response.main.humidity;
                   mainCard.append(("<p>").html("Humidity: " + humidity));
                   
                   var windSpeed = response.wind.speed;
                   mainCard.append(("<p>").html("Wind Speed: " + windSpeed));

                   var lat = response.coord.lat;
                   var lon = response.coord.lon;

                   $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/uvi?appid=cfd7298139fb45786d6fd71f01931c56&lat=" + lat + "&lon=" + lon,
                   
                    method: "GET"
                
                   }).then(function(response){

                    mainCard.append($("<p>").html("UV Index:<span>" + response.value + "</span>"));

                    if (response.value <=2){
                        $("span").attr("class", "btn btn-outline-success");
                    };

                    if (response.value > 2 && response.value <= 5){
                        $("span").attr("class", "btn btn-outline-warning");
                    };

                    if (response.value > 5){
                        $("span").attr("class", "btn btn-outline-danger");
                    };
                 
                   })

                $.ajax({
                    
                    
                   url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=49fb27317373bb54f7d9243387af6df3",
                   method: "GET"


                }).then(function(response){
                    for (i = 0; i < 5; i++){
                        
                        var newCard = $("<div>").attr("class", "col fiveDay bg-primary text-white rounded-lg p-2");
                        $("#weekly-forecast").append(newCard);

                        var myDate = new Date(response.list[i * 8].dt * 1000);

                        newCard.append($("<h4>").html(myDate.toLocaleDateString()));

                        var icon = response.list[i * 8].weather[0].icon;

                        var iconUrL = "http://openweathermap.org/img/w/" + iconCode + ".png";

                        newCard.append($("<img>").attr("src", iconUrl));

                        var temp = Math.round((response.list[i * 8].main.temp - 273.15) * 1.80 + 32);

                        newCard.append($("<p>").html("Temp: " + temp + "#8457"));

                        var humidity = response.list[i * 8].main.humidity;

                        newCard.append($("<p>").html("Humidity: " + humidity));


                   }

                })
              })
            };
    
})
