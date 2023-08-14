let search = document.querySelector("#search");

search.addEventListener("input", async function () {
    const inputValue = search.value;

    let result = await fetch(`http://api.weatherapi.com/v1/search.json?key=ca1cb85950cf44a695b154648231208&q=${inputValue}`);
    let finalresult = await result.json();

    await Display(finalresult);
});

updateDayAndDate();
async function fetchData(string_input) {
    let result = await fetch(`http://api.weatherapi.com/v1/current.json?key=ca1cb85950cf44a695b154648231208&q=${string_input}&aqi=no`);
    let finalresult = await result.json();

    return finalresult;
}

async function geticon(string_input) {
    let data = await fetchData(string_input);
    return data.current.condition.icon;
}

async function gettext(string_input) {
    let data = await fetchData(string_input);
    return data.current.condition.text;
}

async function getTemp(string_input) {
    let data = await fetchData(string_input);
    return data.current.temp_c;
}
async function getwindspeed(string_input) {


    let data = await fetchData(string_input);
    return data.current.wind_kph;
}

async function getTemperatureForTomorrow(string_input) {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=ca1cb85950cf44a695b154648231208&q=${string_input}&days=7`);
    const data = await response.json();

    // Assuming forecast data for tomorrow is at index 1 (1 day ahead)
    const temperatureTomorrow = data.forecast.forecastday[1].day.avgtemp_c;
    return temperatureTomorrow;
}



async function Display(finalresult) {
    let blackbox = `
        <div id="country" style="color: #BFC1C8; font-size: 30px;" class="location m-3">
            ${finalresult[0].name}, ${finalresult[0].country}
        </div>`;

    document.getElementById("country").innerHTML = blackbox;
    document.getElementById("temperature-value").innerHTML = await getTemp(finalresult[0].name);
    document.querySelector("#forecast-icon").src = "http:" + await geticon(finalresult[0].name);
    document.getElementById("text").innerHTML = await gettext(finalresult[0].name);
    document.getElementById("kph").innerHTML = await getwindspeed(finalresult[0].name) +" km/hr"
    document.getElementById("temperature-tomorrow").innerHTML = await getTemperatureForTomorrow(finalresult[0].name) + "°C";
}


async function updateDayAndDate() {
    const now = new Date();
    const dayOfWeekNumber = now.getDay();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = daysOfWeek[dayOfWeekNumber];
    const nextDayName = daysOfWeek[dayOfWeekNumber + 1];
    const afterNextDayName = daysOfWeek[dayOfWeekNumber + 2];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[now.getMonth()];

    const dayOfMonth = now.getDate();

    document.getElementById("day-of-week").innerHTML = dayName;
    document.getElementById("tomorow").innerHTML = nextDayName;
    document.getElementById("aftertomorow").innerHTML = afterNextDayName;
    document.getElementById("date").innerHTML = `${dayOfMonth} ${monthName}`;
}



