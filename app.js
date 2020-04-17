window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimeZone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature ');
    const temperatureSpan = document.querySelector('.temperature span');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/f65ec5a19acba7c325279b16b7650092/${lat},${long}`;



            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data => {
                // console.log(data);
                const {temperature, summary, icon}= data.currently;

                //setting DOM elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimeZone.textContent = data.timezone;
                //formulaa for celsius
                let celsius = (temperature - 32) * (5/9);
                //set ICon
                setIcons(icon,document.querySelector(".icon"));

                //Change temp to Celsius/Farenheit 
                temperatureSection.addEventListener('click',() =>{
                    if(temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }else {
                        temperatureSpan.textContent ="F";
                        temperatureDegree.textContent = temperature;
                    }
                });


            });
        }); 
    }
    //setting the skyicons

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();//replacing all the _ with - in  the icons text and transforming it to uppercase
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});