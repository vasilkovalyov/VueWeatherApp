<template>
    <div class="weather-panel-info">
        <div class="panel-info">
            <span class="weather-temperature">{{this.$store.getters.getCityTemperature | filterOutput}}<sup>°</sup></span>
            <div class="city-weather-info">
                <span class="city">{{this.$store.getters.getCityWeather}}</span>
                <span class=weather-description>
                    <span class="short-date">22.45</span> 
                    <span class="name-day"> - Saturday,</span>
                    <span class="full-date">7 Dec 19</span>
                </span>
            </div>
            <div class="type-weather">
                <span class="weather-icon">
                    <img :src=this.$store.getters.getIconWeather alt='icon'>
                </span>
                <span class="weather-type">{{this.$store.getters.getTypeTemperature}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                
            }
        },
        filters: {
            filterOutput(value) {
                return parseFloat(value).toFixed(0);
            }
        }
    }
</script>
<style lang="scss">

</style>