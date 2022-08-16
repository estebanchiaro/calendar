let weather= {
    apiKey: "cd29e310d8ff2639443dad4aaaa22c7e",
    fetchWeather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+ city +
        "&units=imperial&appid="+ this.apiKey)
        .then((response)=>response.json())
        .then((data)=>this.displayWeather(data))
    }, 

    displayWeather: function(data){
        const{name} = data;
        const{icon, description}= data.weather[0];
        const{temp, humidity}= data.main;
        const{speed}=data.wind;
        const{sunrise}=data.sys;
        const{sunset}=data.sys;

        let unix_timestampSunrise = sunrise

var date = new Date(unix_timestampSunrise * 1000);
var hours = date.getHours();
var minutes = "0" + date.getMinutes();
var seconds = "0" + date.getSeconds();
var formattedTimeSunrise = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);



let unix_timestampSunset = sunset

var date = new Date(unix_timestampSunset * 1000);
var hours = date.getHours();
var minutes = "0" + date.getMinutes();
var seconds = "0" + date.getSeconds();
var formattedTimeSunset = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);





        document.querySelector(".city").innerText= "Weather in "+ name;
        document.querySelector(".icon").src= "https://openweathermap.org/img/wn/"+icon+
         "@2x.png";
         document.querySelector(".description").innerText= description;
         document.querySelector(".temp").innerText= temp+"°F";
         document.querySelector(".humidity").innerText="Humidity: "+ humidity+"%";
         document.querySelector(".wind").innerText="Wind Speed: "+speed+" mph";
        document.querySelector(".sunrise").innerText="Sunrise at: "+ formattedTimeSunrise+" 🌝"
        document.querySelector(".sunset").innerText="Sunset at: "+formattedTimeSunset+" 🌚"



         document.querySelector(".weather").classList.remove("loading")
         document.body.style.backgroundImage="url('https://source.unsplash.com/1600x900/?"
         +name+"')";
        if(name=="Mt. Dora"){document.body.style.backgroundImage="url('imgs/mt.dora.jpg')"}
        else if(name=="Jacksonville"){document.body.style.backgroundImage="url('imgs/jacksonville.jpg')"}
        else if(name=="Orlando"){document.body.style.backgroundImage="url('imgs/orlando.jpg')"}
        else if(name=="Houston"){document.body.style.backgroundImage="url('imgs/houston.jpg')"}
        else if(name=="New York"){document.body.style.backgroundImage="url('imgs/ny1.jpg')"}
        else if(name=="Las Vegas"){document.body.style.backgroundImage="url('imgs/lasvegas.jpg')"}
        else if(name=="Roswell"){document.body.style.backgroundImage="url('imgs/roswell.jpg')"}
        else if(name=="Eustis"){document.body.style.backgroundImage="url('imgs/eustis.jpg')"}
        else if(name=="Miami"){document.body.style.backgroundImage="url('imgs/miami.jpg')"}
        else if(name=="Lafayette"){document.body.style.backgroundImage="url('imgs/lafayette.jpg')"}
        else if(name=="Ruidoso"){document.body.style.backgroundImage="url('imgs/ruidoso.jpg')"}


    },
    search:function(){
        this.fetchWeather(document.querySelector(".search-bar").value)
    },
};

let geocode= {
    reverseGeocode: function(latitude,longitude){
        var api_key = '020e980105c74f07a441d1a23b3f1439';
  
  
    var api_url = 'https://api.opencagedata.com/geocode/v1/json'
  
    var request_url = api_url
      + '?'
      + 'key=' + api_key
      + '&q=' + encodeURIComponent(latitude + ',' + longitude)
      + '&pretty=1'
      + '&no_annotations=1';
  
    // see full list of required and optional parameters:
    // https://opencagedata.com/api#forward
  
    var request = new XMLHttpRequest();
    request.open('GET', request_url, true);
  
    request.onload = function() {
      // see full list of possible response codes:
      // https://opencagedata.com/api#codes
  
      if (request.status === 200){
        // Success!
        var data = JSON.parse(request.responseText);

        weather.fetchWeather(data.results[0].components.city)
      } else if (request.status <= 500){
        // We reached our target server, but it returned an error
  
        console.log("unable to geocode! Response code: " + request.status);
        var data = JSON.parse(request.responseText);
        console.log('error msg: ' + data.status.message);
      } else {
        console.log("server error");
      }
    };
  
    request.onerror = function() {
      // There was a connection error of some sort
      console.log("unable to connect to server");
    };
  
    request.send();  // make the request
    },

    getLocation: function(){
        function success(data){
                geocode.reverseGeocode(data.coords.latitude,data.coords.longitude)
        }
        if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success,console.error)
        }
        else{
            weather.fetchWeather("Miami")
        }
    }
}

document.querySelector(".search button").addEventListener("click", function(){
    weather.search();

})

document.querySelector(".search-bar").addEventListener("keyup",function(event){
    if(event.key=="Enter"){weather.search()}
})

geocode.getLocation();
