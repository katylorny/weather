<template>
  <div class="main">
    <v-header/>
    <days/>
  </div>
</template>

<script>
import Header from "../components/Header";
import Days from "../components/Days";

export default {
  name: "Main",
  data() {
    return {
      geoPosition: ``
    }
  },
  components: {
    Days,
    VHeader: Header
  },
  mounted() {
   navigator.geolocation.getCurrentPosition(this.onSuccess)
  },
  methods: {
    onSuccess(geo) {
      console.log(geo);
      // const lat = geo.coords.latitude;
      // const long = geo.coords.longitude;
    }
  }
}
</script>

<style lang="scss" scoped>

.main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  background: url("../assets/img/mountain.jpg");
  background-size: cover;

}


</style>