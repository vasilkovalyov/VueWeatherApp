<template>
    <div class="weather-panel-info">
        <div class="panel-info">
            <span class="weather-temperature">{{getCityTemperature | filterOutput}}<sup>°</sup></span>
            <div class="city-weather-info">
                <span class="city">{{getCityWeather}}</span>
                <span class=weather-description>
                    <span class="short-date">{{getCurrentTimeCity}}</span> 
                    <span class="name-day"> | </span>
                    <!-- <span class="name-day"> - Saturday,</span> -->
                    <span class="full-date">{{getCurrentDateCity}}</span>
                </span>
            </div>
            <div class="type-weather">
                <span class="weather-icon">
                    <img :src=getIconWeather alt='icon'>
                </span>
                <span class="weather-type">{{getTypeTemperature}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';

    export default {
        filters: {
            filterOutput(value) {
                return parseFloat(value).toFixed(0);
            }
        },

        computed: {
            ...mapGetters([
                "getCityTemperature",
                "getCityWeather",
                "getIconWeather",
                "getTypeTemperature",
                "getCurrentTimeCity",
                "getCurrentDateCity"
            ])
        }
    }

</script>
<style lang="scss">

</style>