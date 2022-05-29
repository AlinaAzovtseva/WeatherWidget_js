const link = "https://api.weatherstack.com/current?access_key=db2894b25e2611f1e7ffb057f5e18a11"
const weatherBlock = document.querySelector('.weather__widget')
const body = document.querySelector('body')
const textInput = document.getElementById("text-input");
const form = document.getElementById("form");
const popup = document.getElementById("popup");
const close = document.getElementById("close");


let store = {
	city: "Mykolayiv, Mykolayivs'ka Oblast'",
	weatherDescriptions: '',
	temperature: 0,
	region: "Mykolayivs'ka Oblast'",
	isDay: "yes",
	weatherIcons:'',
}

const fetchData = async () => {

	const query = localStorage.getItem('query') || store.city;
	const result = await fetch(`${link}&query=${query}`);
	const data = await result.json(); console.log(data)

 
	const {
	 current: { weather_icons: weatherIcons, weather_descriptions: weatherDescriptions, temperature, is_day:isDay },
	 location: { name, region }
	} = data;

	 store = {
	 	...store,
		city: name,
		weatherDescriptions,
		temperature,
		region,
		isDay,
		weatherIcons,
	 };

	renderComponent();
}

const getImage = (weatherDescriptions) => {
	if (weatherDescriptions == 'Partly cloudy') return 'cloudy.png';
	if (weatherDescriptions == 'Sunny') return 'sunny.png';
	if (weatherDescriptions == 'Light rain') return 'light_rain.png';
	if (weatherDescriptions == 'Clear') return 'clear.png';
	if (weatherDescriptions == 'Patchy rain possible') return 'light_rain.png';
	if (weatherDescriptions == 'Light Rain With Thunderstorm') return 'thunderstorm.png';
	if (weatherDescriptions == 'Mist') return 'mist.png';
	if (weatherDescriptions == 'Patchy light drizzle') return 'light_rain.png';
	if (weatherDescriptions == 'Rain With Thunderstorm') return 'thunderstorm.png';
	if (weatherDescriptions == 'Light drizzle') return 'light_rain.png';
	if (weatherDescriptions == 'Patchy light rain') return 'light_rain.png';
}

const markup = () => {
	const { city, weatherDescriptions, temperature, region, isDay, weatherIcons} = store;
	isDay === 'no'? body.classList.add('is-day') : "";
	isDay === 'yes'? body.classList.remove('is-day') : "";

	return ` <div class="weather__widget-block">
				<div class="widget-block__city">${city}, <img src="img/down.png"> ${region}</div> 
				<div class="widget-block__temperature">${temperature}°C</div>
				<div class="widget-block__status">
					<img src="../img/${getImage(weatherDescriptions)}" alt="">
					<p>${weatherDescriptions}</p>
				</div>			
			</div>
			<div class="weather__widget-img">
				<img src="img/bg-image.png">
			</div>
			`
}
const togglePopupClass = () => {
  popup.classList.toggle("active");
};

const renderComponent = () => {
  weatherBlock.innerHTML = markup();

  const city = document.querySelector('.widget-block__city');
  city.addEventListener("click", togglePopupClass);
  close.addEventListener("click", togglePopupClass);
};

const handleInput = (e) => {
  store = {
    ...store,
    city: e.target.value,
  };

};

const handleSubmit = (e) => {
  e.preventDefault();
  const value = store.city;

  if (!value) return null;
	
  localStorage.setItem("query", value);
  fetchData();
  togglePopupClass();
  textInput.value = '';
};

form.addEventListener("submit", handleSubmit);
textInput.addEventListener("input", handleInput);

fetchData();
