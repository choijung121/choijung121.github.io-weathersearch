document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
   const value = document.getElementById("weatherInput").value;
   if (value === "")
     return;
   console.log(value);
   const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",{state code}" + ",{country code}" + ",US&units=imperial" + "&APPID=0b9d58182e86097e433ad892d91116bd";
   fetch(url)
     .then(function(response) {
       return response.json();
     }).then(function(json) {
       let results = "";
        results += '<div class = wrapBox>';
          results += '<div class = box>';
            results += '<div class = boxContent>';

              results += '<h2 class = "cityName"><i class="fa fa-map-marker" aria-hidden="true"></i> ' + json.name + ", " + json.sys.country + "</h2>";
              // for(let i = 0; i < json.list.length; i++) {
              //   results += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
              // }

              //Main Temp
              results += '<div class = images>';
              for (let i=0; i < json.weather.length; i++) {
                results += '<img src = "http://openweathermap.org/img/wn/' + json.weather[i].icon + '.png">' + '<span class = mainTemp>' + Math.round(json.main.temp) + " &deg;F" + '</span>';
              }
              results += '</div>';
              //weather Min/Max Temp
              results += '<p><b>' + Math.round(json.main.temp_max) + "&deg;F" + ' / ' + Math.round(json.main.temp_min) + "&deg;F" + '</b><p>';
              results += "<br>"

              //Feels like
              results += "<p>" + "Feels like "+ Math.round(json.main.feels_like) + " &deg;F" + "<p>";
              results += "<span>";
              //Weather description
              results += "<p><b>"
              for (let i=0; i < json.weather.length; i++) {
                results += json.weather[i].description
                if (i !== json.weather.length - 1)
                 results += ", "
              }
              results += "</b></p>";
              results += "</span>";


            results += '</div>';
          results += '</div>';
        results += '</div>';

      document.getElementById("weatherResults").innerHTML = results;
    });
   // const hourlyUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=0b9d58182e86097e433ad892d91116bd";
   // fetch(hourlyUrl)
   //  .then(function(response) {
   //    return response.json();
   //  }).then(function(json){
   //    let forecast = "";
   //    forecast += "<h2>Hourly Focecast" + "</h2>";
   //    // for(let i = 0; i < json.list.length; i++) {
   //    //   forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
	 //    //   forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
	 //    //   forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>';
   //    // }
   //
   //    document.getElementById("forecastResults").innerHTML = forecast;
   //  });
});
