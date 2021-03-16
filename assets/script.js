var searchHistory = [];
// contains an empty list till data is given


// returns history from local storage.
    function getItems() {
        var storedCities = JSON.parse(localStorage.getItem("searchHistory"));
        console.log("searcHistory");
        if (storedCities !== null) {
            searchHistory = storedCities;
        }
        //  10 locations are listed
        for (i = 0; i < searchHistory.length; i++) {
            if (i == 10) {
                break;
              }
        
            listButton = $("<a>").attr({
                class: "list-group-item list-group-item-action",
                href: "#"
            });
            // appends history li
        
            listButton.text(searchHistory[i]);
            $(".list-group").append(listButton);
        }
    }
    var city;
    var mainCard = $(".card-body");
    
    getItems();
    
    function getData() { // my api code
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=cfd7298139fb45786d6fd71f01931c56"; // starts call for current conditions
        mainCard.empty();
        $("#weeklyForecast").empty();
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(getData);
            
            var date = moment().format(" MM/DD/YYYY", "hh:mm:ss a");
            
            var iconCode = response.weather[0].icon;
            console.log(response.weather);
               
            
            var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
            
            var name = $("<h3>").html(city + date);
            
            mainCard.prepend(name);
            
            mainCard.append($("<img>").attr("src", iconURL));
            
            var temp = Math.round((response.main.temp - 273.15) * 1.80 + 32);
            mainCard.append($("<p>").html("Temperature: " + temp + " &#8457")); 
            var humidity = response.main.humidity;
            mainCard.append($("<p>").html("Humidity: " + humidity)); // 
            var windSpeed = response.wind.speed;
            mainCard.append($("<p>").html("Wind Speed: " + windSpeed)); 
            
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            // call for the current uv index
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/uvi?appid=cfd7298139fb45786d6fd71f01931c56&lat=" + lat + "&lon=" + lon, // my api code
                method: "GET"
            
            }).then(function (response) {
                mainCard.append($("<p>").html("UV Index: <span>" + response.value + "</span>"));
                // 
                if (response.value <= 2) {
                    $("span").attr("class", "btn btn-outline-success");
                }
                if (response.value > 2 && response.value <= 5) {
                    $("span").attr("class", "btn btn-outline-warning");
                }
                if (response.value > 5) {
                    $("span").attr("class", "btn btn-outline-danger");
                }
            });
            // call for the 5 day forecast
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=49fb27317373bb54f7d9243387af6df3", // my api code
                method: "GET"
            
            }).then(function (response) {
                for (i = 0; i < 5; i++) { 
                    // loop to display 5 cards
                    
                    var newCard = $("<div>").attr("class", "col fiveDay bg-primary text-white rounded-lg p-2");
                    $("#weeklyForecast").append(newCard);
                    
                    var myDate = new Date(response.list[i * 8].dt * 1000);
                    
                    newCard.append($("<h4>").html(myDate.toLocaleDateString()));
                    
                    var iconCode = response.list[i * 8].weather[0].icon;
                    
                    var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
                    
                    newCard.append($("<img>").attr("src", iconURL));
                    
                    var temp = Math.round((response.list[i * 8].main.temp - 273.15) * 1.80 + 32);
                    
                    newCard.append($("<p>").html("Temp: " + temp + " &#8457")); //appends fahrenheit degrees using short key code
                    
                    var humidity = response.list[i * 8].main.humidity;
                    
                    newCard.append($("<p>").html("Humidity: " + humidity));
                    // appends all the temp, humidity, and icons.
                }
            });
       
         });

        
    }


$("#searchCity").click(function() {
    city = $("#city").val().trim();
    // searches then adds it to the history
    
    getData();
    var checkArray = searchHistory.includes(city);
    
    if (checkArray == true) {
        return
    }
    else {
        searchHistory.push(city);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        var listButton = $("<a>").attr({
            // creating search history buttons
            class: "list-group-item list-group-item-action",
            href: "#"
           
        });
        listButton.text(city);
        $(".list-group").append(listButton);
    
        
    }
 
    
   $("#city").val("");
//clears form after city is entered


});

// need to come up with solution and have yet to figure it out.  Might figure it out with tutor
// $("#searcher").click(function() {
//     city = $(this).text();
//     getData();
    
// });





$("#clear").click( function() {
    window.localStorage.clear();
    location.reload();
    return false;
    });



    




        
    


