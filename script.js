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

        document.querySelector(".city").innerText= "Weather in "+ name;
        document.querySelector(".icon").src= "https://openweathermap.org/img/wn/"+icon+
         "@2x.png";
         document.querySelector(".description").innerText= description;
         document.querySelector(".temp").innerText= temp+"°F";
         document.querySelector(".humidity").innerText="Humidity: "+ humidity+"%";
         document.querySelector(".wind").innerText="Wind Speed: "+speed+" mph";

         document.querySelector(".weather").classList.remove("loading")
         document.body.style.backgroundImage="url('https://source.unsplash.com/1600x900/?"
         +name+"')";
        if(name=="Mt. Dora"){document.body.style.backgroundImage="url('imgs/random.jpg')"}
        else if(name=="Jacksonville"){document.body.style.backgroundImage="url('imgs/random.jpg')"}
        else if(name=="Orlando"){document.body.style.backgroundImage="url('imgs/orlando.jpg')"}
        else if(name=="Houston"){document.body.style.backgroundImage="url('imgs/random.jpg')"}
        else if(name=="New York"){document.body.style.backgroundImage="url('imgs/ny.jpg')"}
        else if(name=="Las Vegas"){document.body.style.backgroundImage="url('imgs/random.jpg')"}
        else if(name=="Roswell"){document.body.style.backgroundImage="url('imgs/roswell.jpg')"}
        else if(name=="Tavares"){document.body.style.backgroundImage="url('imgs/random.jpg')"}
        else if(name=="Miami"){document.body.style.backgroundImage="url('imgs/random.jpg')"}

    },
    search:function(){
        this.fetchWeather(document.querySelector(".search-bar").value)
    },
};

document.querySelector(".search button").addEventListener("click", function(){
    weather.search();

})

document.querySelector(".search-bar").addEventListener("keyup",function(event){
    if(event.key=="Enter"){weather.search()}
})