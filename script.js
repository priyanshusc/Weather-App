window.onload = function () {
    // ✅ Now everything runs AFTER the page fully loads

    let apiKey = "YOUR_API_KEY";
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    if (apiKey === "YOUR_API_KEY") {
        alert("⚠️ Please add your own OpenWeather API key to use this app.");
    }

    let searchBox = document.querySelector(".search input");
    let searchBtn = document.querySelector(".search button");
    let suggestionBox = document.querySelector(".suggestions");

    function debounce(fn, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    async function getCitySuggestions(query) {
        const res = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=5&namePrefix=${query}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': "YOUR_API_KEY",
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        });
        const data = await res.json();
        return data.data.map(city => `${city.city}, ${city.countryCode}`);
    }

    searchBox.addEventListener("input", debounce(async () => {
        const query = searchBox.value.trim();
        if (!query) {
            suggestionBox.classList.add("hidden");
            return;
        }

        const suggestions = await getCitySuggestions(query);
        if (suggestions.length === 0) {
            suggestionBox.classList.add("hidden");
            return;
        }

        suggestionBox.innerHTML = suggestions
            .map(city => `<li class="cursor-pointer px-4 py-2 hover:bg-white/20">${city}</li>`)
            .join("");

        suggestionBox.classList.remove("hidden");

        document.querySelectorAll(".suggestions li").forEach(item => {
            item.addEventListener("click", () => {
                searchBox.value = item.innerText;
                suggestionBox.classList.add("hidden");
                checkWeather(item.innerText);
            });
        });
    }, 100));

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".search")) {
            suggestionBox.classList.add("hidden");
        }
    });

    async function checkWeather(city) {
        if (apiKey === "YOUR_API_KEY" || !apiKey) {
            alert("⚠️ Please add your own OpenWeather API key to use this app.");
            return;
        }
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();
        if (data.cod !== 200) {
            alert("City not found");
            return;
        }

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".wind").innerHTML = `${(data.wind.speed * 3.6).toFixed(2)} km/h`;
        document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
        document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;

        const icon = document.querySelector(".weather-icon");
        switch (data.weather[0].main) {
            case "Clouds": icon.src = "./images/clouds.png"; break;
            case "Rain": icon.src = "./images/rain.png"; break;
            case "Mist": icon.src = "./images/mist.png"; break;
            case "Drizzle": icon.src = "./images/drizzle.png"; break;
            case "Clear": icon.src = "./images/clear.png"; break;
            default: icon.src = "./images/clear.png"; break;
        }
    }

    if (apiKey !== "YOUR_API_KEY" && apiKey) {
        checkWeather("Bangalore");
    }

    searchBtn.addEventListener("click", () => {
        setTimeout(() => {
            suggestionBox.classList.add("hidden");
            checkWeather(searchBox.value);
        }, 100);
    });

    searchBox.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            checkWeather(searchBox.value);
            suggestionBox.classList.add("hidden");
        }
    });
};
