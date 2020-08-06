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
        results += '<h2 class = "cityName">Weather in ' + json.name + ", " + json.sys.country + "</h2>";
        results += '<h2 class = "mainTemp">' + Math.round(json.main.temp) + " &deg;F</h2>"
        results += "<p>"
        for (let i=0; i < json.weather.length; i++) {
          results += json.weather[i].description
          if (i !== json.weather.length - 1)
           results += ", "
        }
        results += "</p>";
        results += '<div class = images>';
        for (let i=0; i < json.weather.length; i++) {
          // results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
          results += '<img src = "http://openweathermap.org/img/wn/' + json.weather[i].icon + '@2x.png"/>'Math.round(json.main.temp_max) + "&deg;F" + ' / ' + Math.round(json.main.temp_min) + "&deg;F";
          // 'http://openweathermap.org/img/wn/10d@2x.png'
        }
        results += '<h2>' + Math.round(json.main.temp_max) + "&deg;F" + ' / ' + Math.round(json.main.temp_min) + "&deg;F</h2>"
        results += '</div>';
        results += '</div>';
        results += '</div>';
        results += '</div>';



        document.getElementById("weatherResults").innerHTML = results;
   });
});
