import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const weahherApiKey = 'fa86230905bf0a50a2962e22862e3038';
const timeZoneApiKey = 'SZWDLDDGQE1J';
const units = 'metric';

export default new Vuex.Store({
  	state: {
		weatherObj: {},
		cityName: '',
		cityTemperature: '',
		typeWeather: '',
		weatherDetails: [],
		iconWeather: '',
		bgImageWeather: '',
		currentTimeCity: '',
		currentDateCity: ''
  	},

	mutations: {
		setWeatherObj(state, payload) {
			state.weatherObj = payload;
		},
		setCityName(state, payload) {
			state.cityName = payload;
		},
		setCityTemperature(state, payload) {
			state.cityTemperature = payload;
		},
		setTypeWeather(state, payload) {
			state.typeWeather = payload;
		},
		setWeatherDetails(state, payload) {
			state.weatherDetails = payload;
		},
		setIconWeather(state, payload) {
			state.iconWeather = payload;
		},
		setBgImageWeather(state, payload) {
			state.bgImageWeather = payload;
		},
		setCurrentTimeCity(state, payload) {
			state.currentTimeCity = payload;
		},
		setCurrentDateCity(state, payload) {
			state.currentDateCity = payload;
		},

  	},

	actions: {
		getWeatherInfo(store) {
			Vue.axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${store.getters.getCityName}&APPID=${weahherApiKey}&units=${units}`)
			.then(response => response.data)
			.then(data => {
				console.log(data);
				store.dispatch("weatherData", data);
			})
			.catch(error => error);
		},

    weatherData(store, data) {
    	store.commit('setWeatherObj', data);
    	store.commit('setCityTemperature', data.main.temp);
    	store.commit('setTypeWeather', data.weather[0].description);
    	store.commit('setWeatherDetails', [
        	{ key: 'Clouds', value: data.clouds.all + '%'},
        	{ key: 'Humidity', value: data.main.humidity + '%' }, 
        	{ key: 'Speed', value: data.wind.speed + 'km/h'}
      	]),
      	store.commit('setIconWeather', data.weather[0].icon);
		store.commit('setBgImageWeather', data.weather[0].description + '.jpg');
		store.dispatch("timeLocation");
    },

    findMe(store) {
      	navigator.geolocation.getCurrentPosition(success);
     	function success(pos) {
        	const lat = pos.coords.latitude;
        	const lon = pos.coords.longitude;

			Vue.axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${weahherApiKey}&units=${units}`)
			.then(response => response.data)
			.then(data => {
				store.commit('setCityName', data.name);
				store.dispatch("weatherData", data);
				
			})
			.catch(error => error); 
      	}
    },

    timeLocation(store) {
      	const lat = store.state.weatherObj.coord.lat;
      	const lon = store.state.weatherObj.coord.lon;

     	 Vue.axios.get(`http://api.timezonedb.com/v2.1/get-time-zone?key=${timeZoneApiKey}&format=json&by=position&lat=${lat}&lng=${lon}`)
			.then(response => response.data)
			.then(data => {
				const date = data.formatted.split(' ')[0];
				const time = data.formatted.split(' ')[1];

				store.commit('setCurrentDateCity', date);
				store.commit('setCurrentTimeCity', time.slice(0, time.length - 3));
			})
      	.catch(error => error);
    }
  },


	getters: {
		getCityName(state) {
			return state.cityName;
		},
		getWeatherObj(state) {
			return state.weatherObj;
		},
		getCityWeather(state) {
			return state.weatherObj.name;
		},
		getCityTemperature(state) {
			return state.cityTemperature;
		},
		getTypeTemperature(state) {
			return state.typeWeather;
		},
		getWeatherDetails(state) {
			return state.weatherDetails;
		},
		getIconWeather(state) {
			return `http://openweathermap.org/img/wn/${state.iconWeather}@2x.png`;
		},
		getWeatherImage(state) {
			return state.bgImageWeather;
		},
		getCurrentTimeCity(state) {
			return state.currentTimeCity;
		},
		getCurrentDateCity(state) {
			return state.currentDateCity;
		},

  	}
})
