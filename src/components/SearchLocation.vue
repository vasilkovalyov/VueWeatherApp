<template>
    <div class="form-search">
        <input type="text" placeholder="Search city" class="input-city" id='input-city' v-model='cityName' @change='inputCity'>
    </div>
</template>
<script>
export default {
    data() {
        return {
            cityName: ''
        }
    },
    methods: {
        inputCity() {
            this.$store.commit('setCityName', this.cityName);
            this.$store.dispatch("getWeatherInfo");
        }
    }
}
</script>
<style lang='scss'>
</style>