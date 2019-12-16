<template>
  <div id="app" class="wrapper">
    <div class="weather-panel" style="background-image: url(images/rainy.jpg)">
      <span class="logo">weather.com</span>
      <WeatherCity></WeatherCity>
      <WeatherDetails></WeatherDetails>
    </div>
  </div>
</template>

<script>

import WeatherCity from "./components/WeatherCity";
import WeatherDetails from "./components/WeatherDetails";

export default {
  name: 'app',
  components: {
    WeatherCity,
    WeatherDetails
  },
  mounted () {
    this.$store.dispatch("findMe");
    this.$store.dispatch("timeLocation");
  }
}
</script>

<style lang="scss">
@import './assets/scss/style';

.logo {
  font-weight: 500;
  font-size: 20px;
  text-shadow: 0px 0px 12px rgba(0,0,0,0.22);
  position: absolute;
  top: 90px;
  left: 180px;
}

.weather-panel {
  height: 100vh;
  background-size: cover;
  background-position: center;
  color: #fff;
  display: flex;
  flex-wrap: wrap;
}

</style>
