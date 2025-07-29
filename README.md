# 🌤️ Weather Forecast Web App

A sleek and responsive weather app built with **HTML**, **Tailwind CSS**, and **JavaScript**. It fetches real-time weather data and gives smart city suggestions using APIs. Designed with a modern glassmorphism UI. ✨

---

## 🚀 Features

- 🔍 Search for any city in the world
- 📍 Live city suggestions using **GeoDB Cities API**
- 🌡️ Real-time weather info: temperature, wind speed, and humidity
- 💨 Unit conversion for wind speed (m/s ➝ km/h)
- 🎨 Clean and responsive UI with Tailwind CSS
- ⚠️ Alert for missing API key to help users configure easily

---

## 📸 Preview

<img width="1014" height="602" alt="image" src="https://github.com/user-attachments/assets/c50963c8-cc6d-46b6-aa20-d8d8d7de4ca9" />

---

## 🛠️ Tech Stack

- **HTML5**
- **Tailwind CSS**
- **JavaScript (ES6)**
- [OpenWeatherMap API](https://openweathermap.org/api)
- [GeoDB Cities API (via RapidAPI)](https://rapidapi.com/wirefreethought/api/geodb-cities)

---

## 🔧 Setup Instructions

### 1️⃣ Clone the Repository

bash
git clone https://github.com/your-username/weather-app.git
cd weather-app

### 2️⃣ Add Your API Keys
Open the script.js file and replace the placeholders:
```
let apiKey = "YOUR_API_KEY"; // <-- Your OpenWeatherMap API key
```
In the GeoDB API fetch call:
```
headers: {
  'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY', // <-- Your RapidAPI key
  'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
}
```
💡 If YOUR_API_KEY is not replaced, the app will show an alert asking you to provide your key.

### ▶️ Run Locally
You can open index.html directly in your browser
OR

Use Live Server in VS Code for a better experience
