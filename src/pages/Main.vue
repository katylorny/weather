<template>
  <div class="main" :style="{ backgroundImage: 'url(' + `${PICS[icon] || mountainImg}` + ')' }">
    <v-header/>
    <days/>
  </div>
</template>

<script>
import Header from "../components/Header";
import Days from "../components/Days";
import {mapState} from "vuex";
import {PICS} from "../common/pics";
import mountainImg from "../assets/img/mountain.jpg"

export default {
  name: "Main",
  data() {
    return {
      geoPosition: ``,
      PICS,
      mountainImg
    }
  },
  components: {
    Days,
    VHeader: Header
  },
  computed: {
    ...mapState([
      'icon'
    ])
  }

}
</script>

<style lang="scss" scoped>

.main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  //background: url("../assets/img/mountain.jpg");
  //background: url("../assets/img/rain.jpg");
  background-size: cover;

}


</style>