<template>
    <div class="weather-details" >
        <div class="blur" style="background-image: url(images/rainy.jpg)"></div>
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

    export default {
        data() {
            return {
            }
        },
        computed: {
            getWeatherDetails() {
                return this.$store.getters.getWeatherDetails
            }
        },
        components: {
            SearchLocation
        }
    }
</script>
<style lang="scss">
    
</style>