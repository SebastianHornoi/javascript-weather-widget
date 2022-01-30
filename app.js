

const apiKey = "ff1a58fce59ac43d185acf3e760312aa";
//variabili sezione tempo di oggi
const currentTemp = document.getElementById('currentTemp');
const currentCity = document.getElementById('currentCity');
const currentIcon = document.getElementById('currentIcon');
//variabili sezione tempo nelle prossime ore
const hourTemperature = document.querySelectorAll('.hourTemperature');
const hourIcon = document.querySelectorAll('.hourIcon');
const hourDataTime = document.querySelectorAll('.hourDataTime');



function weatherCall(){
  new Glide('.glide').mount()
  const bullet1 = document.getElementById('bullet1')
  const bullet2 = document.getElementById('bullet2')
  const bullet3 = document.getElementById('bullet3')

  bullet1.addEventListener('click', function(){
     bullet1.classList.add('active')
     bullet2.classList.remove('active')
     bullet3.classList.remove('active')
  })


    bullet2.addEventListener('click', function(){
       bullet1.classList.remove('active')
       bullet2.classList.add('active')
       bullet3.classList.remove('active')
    })


      bullet3.addEventListener('click', function(){
         bullet1.classList.remove('active')
         bullet2.classList.remove('active')
         bullet3.classList.add('active')
      })



  navigator.geolocation.getCurrentPosition((success) =>{
   let lon = success.coords.longitude;
   let lat = success.coords.latitude;

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=it&exclude={part}&appid=${apiKey}`)
    .then((data) => data.json())
    .then((data) =>{
        console.log(data)

        for(i = 0; i < hourTemperature.length; i++){
          let temperature = Math.floor(data.hourly[i].temp)
          hourTemperature[i].innerHTML = temperature + '°'
        }

        for(j = 0; j < hourDataTime.length; j++){
          let hour = data.hourly[j].dt;
          const realHour = new Date(hour);
          realHour.setUTCSeconds(hour);
          finalHour = realHour.getUTCHours();
          hourDataTime[j].innerHTML = finalHour + ':00'
        }

        for(y = 0; y < hourIcon.length; y++){
          let icon = data.hourly[y].weather[0].icon
          hourIcon[y].src = `http://openweathermap.org/img/wn/${icon}@2x.png`
        }


      })


      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=it&appid=${apiKey}`)
      .then((data2) => data2.json())
      .then((data2) =>{
          console.log(data2)
          currentTemp.innerHTML = Math.floor(data2.main.temp) + '°';
          currentCity.innerHTML = `<b>${data2.name}</b> <br> ${data2.weather[0].description}`
          currentIcon.src = `http://openweathermap.org/img/wn/${data2.weather[0].icon}@2x.png`
        })


  })
}
