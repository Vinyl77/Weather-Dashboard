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
    
})
