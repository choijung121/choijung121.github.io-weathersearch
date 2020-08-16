document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
   const value = document.getElementById("weatherInput").value;
   if (value === "")
     return;
   console.log(value);
   const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",{zip code}" + ",{state code}" + ",{country code}" + ",US&units=imperial" + "&APPID=0b9d58182e86097e433ad892d91116bd";
   fetch(url)
     .then(function(response) {
       return response.json();
     }).then(function(json) {
       let results = "";
        results += '<div class = wrapBox>';
          results += '<div class = box>';
            results += '<div class = boxContent>';
              results += '<h2 class = "cityName"><i class="fa fa-map-marker" aria-hidden="true"></i> ' + json.name + ", " + json.sys.country + "</h2>";
              //Main Temp
              results += '<div class = images>';
              for (let i=0; i < json.weather.length; i++) {
                results += '<img src = "http://openweathermap.org/img/wn/' + json.weather[i].icon + '@2x.png">' + '<span class = mainTemp>' + Math.round(json.main.temp) + " &deg;F" + '</span>';
              }
              results += '</div>';
              //Weather description
              results += "<p><b>"
              for (let i=0; i < json.weather.length; i++) {
                results += json.weather[i].description
                if (i !== json.weather.length - 1)
                 results += ", "
              }
              results += "</b></p>";
              //weather Min/Max Temp
              results += "<div class = maxMin>"
                results += '<p><b>' + Math.round(json.main.temp_max) + "&deg;F" + ' / ' + Math.round(json.main.temp_min) + "&deg;F" + '</b><p>';
              results += "</div>"
            results += '</div>';
          results += '</div>';

          //weather today data
          results += '<div class = box>';
            // results += '<div class = boxContent>';
              results += '<div class = weatherToday>';
                results += '<h2 class = "cityName">' + "Weather Today in " + json.name + "</h2>";
                //Feels like
                results += "<p>" + "Feels like " + "<b>" + Math.round(json.main.feels_like) + " &deg;F" + "</b></p>";
                //columns of data
                results += "<div class = 'weatherDataToday'>";
                  //data in lists
                  results += "<ul class = weatherDataList>";
                    results += "<table>"

                      results += "<tr>"
                        results += "<td>"
                          results += '<li><i class="fa fa-thermometer-empty" aria-hidden="true"></i>' + " High / Low ";
                        results += "</td>"
                        results += "<td class = 'info'>"
                          results += Math.round(json.main.temp_max) + "&deg;F" + ' / ' + Math.round(json.main.temp_min) + "&deg;F" + "</li>";
                        results += "</td>"
                      results += "</tr>"

                      results += "<tr>"
                        results += "<td>"
                          results += '<li><i class="fa fa-arrow-down" aria-hidden="true"></i>' + " Pressure ";
                        results += "</td>"
                        results += "<td class = 'info'>"
                          results += json.main.pressure + " hPa" + "</li>";
                        results += "</td>"
                      results += "</tr>"

                      results += "<tr>"
                        results += "<td>"
                          results += '<li><i class="fa fa-tint" aria-hidden="true"></i>' + " Humidity ";
                        results += "</td>"
                        results += "<td class = 'info'>"
                          results += json.main.humidity + " %" + "</li>";
                        results += "</td>"
                      results += "</tr>"

                      results += "<tr>"
                        results += "<td>"
                          results += '<li><i class="fas fa-wind"></i>' + "Wind Speed ";
                        results += "</td>"
                        results += "<td class = 'info'>"
                          results += json.wind.speed + " mph " + "</li>";
                        results += "</td>"
                      results += "</tr>"

                      results += "<tr>"
                        results += "<td>"
                          results += '<li><i class="fa fa-cloud" aria-hidden="true"></i>' + " Cloudiness ";
                        results += "</td>"
                        results += "<td class = 'info'>"
                          results += json.clouds.all + " %" + "</li>";
                        results += "</td>"
                      results += "</tr>"

                    results += "</table>"
                  results += "</ul>";
                results += "</div>";
              results += '</div>';
            // results += '</div>';
          results += '</div>';
        results += '</div>';

      document.getElementById("weatherResults").innerHTML = results;
    });
  // const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=0b9d58182e86097e433ad892d91116bd";
  const url2 = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + value + "{city name}&cnt={8}" + "&APPID=0b9d58182e86097e433ad892d91116bd";
  fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let forecast = "";
      forecast += '<h2>Hourly Forcast ' + "</h2>";
      for (let i=0; i < json.list.length; i++) {
        forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm a') + "</h2>";
        forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
        forecast += "<p>Temperature: " + json.list[i].main.temp + " &deg;F</p>";
        forecast += "<p>High of: " + json.list[i].main.temp_max + "&deg;F</p>";

      }
      document.getElementById("forecastResults").innerHTML = forecast;
    });
});
