window.addEventListener('load', () => {
    let long;
    let lat;
    let tempDescription = document.querySelector('.temperature-description');
    let tempDeg = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.degree');
    const tempSpan = document.querySelector('.degree span');
    let weatherIcon = document.querySelector('.weather-icon');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a9ef6b75f1b476a67fa086bc3e8cc047`;

            fetch(api).then(response => response.json()).then(data => {
                console.log(data);
                const { temp } = data.main;
                const { description, icon } = data.weather[0];

                tempDeg.textContent = Math.floor(temp - 273).toString() + "°";
                tempDescription.textContent = description.toLowerCase();
                locationTimezone.textContent = data.name + "," + data.sys.country;
                weatherIcon.innerHTML = `<img src = "icons/${icon}.png" alt="weather-icon">`;

                temperatureSection.addEventListener('click', () => {
                    if (tempSpan.textContent === "F") {
                        tempSpan.textContent = "C";
                        tempDeg.textContent = Math.floor(temp - 273).toString() + "°";
                    } else {
                        tempSpan.textContent = "F";
                        tempDeg.textContent = Math.floor(((temp - 273) * (9 / 5)) + 32).toString() + "°";
                    }
                });


            });

        });
    }


});
