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
    iconWeather: ''
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
    }
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
      // не получается вытянуть данные из weatherObj

      const lat = store.getters.getWatherObj.coord.lat;
      const lon = store.getters.getWatherObj.coord.lon;
      

      Vue.axios.get(`http://api.timezonedb.com/v2.1/get-time-zone?key=${timeZoneApiKey}Y&format=json&by=position&lat=${lat}.689247&lng=${lon}`)
      .then(response => response.data)
      .then(data => {
          console.log(data);
      })
      .catch(error => error);
    }
  },


  getters: {
    getCityName(state) {
      return state.cityName;
    },
    getWatherObj(state) {
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
    }
  }
})
