<template>
    <div class="weather-details" >
        <div class="blur" :style="{ backgroundImage: 'url(images/' + getWeatherImage}"></div>
        <div class="content-holder">
            <SearchLocation></SearchLocation>
            <h6>Weather Details</h6>
            <ul class="weather-details-list">
                <li v-for="(item, i) in getWeatherDetails" :key="i">
                    <span>{{item.key}}</span>
                    <span>{{item.value}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import SearchLocation from './SearchLocation'

    import { mapGetters } from "vuex";

    export default {
        computed: {
             ...mapGetters(["getWeatherDetails", "getWeatherImage", "getWatherObj"]),

            getImg() {
                 return this.getWeatherImage;
            }
        },

        components: {
            SearchLocation
        }
    }
</script>
<style lang="scss">
    
</style>