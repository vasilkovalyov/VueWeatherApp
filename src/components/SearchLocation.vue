<template>
    <div class="form-search">
        <input type="text" placeholder="Search city" class="input-city" id='input-city' v-model='cityName' @change='inputCity'>
    </div>
</template>
<script>

import { mapMutations, mapActions } from "vuex";

export default {
    data() {
        return {
            cityName: ''
        }
    },
    methods: {
        ...mapMutations(["setCityName"]),
        ...mapActions(["getWeatherInfo"]),

        inputCity() {
            this.setCityName(this.cityName);
            this.getWeatherInfo();
            
        }
    }
}
</script>
<style lang='scss'>
</style>