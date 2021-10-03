<template>
  <header class="header">
    <h1 class="header__title">
      Weather
    </h1>
    <p class="header__city">
      {{ city }}
    </p>

  </header>
</template>

<script>


export default {
  name: "Header",
  data() {
    return {
      city: `Allow access to geolocation`
    }
  },
  mounted() {
    navigator.geolocation.getCurrentPosition(this.onSuccess)
  },
  methods: {
    reverseGeocode(coords) {
      fetch('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + coords[0] + '&lat=' + coords[1], {
        headers: {
          'Accept-Language': 'en'
        }
      })
          .then((response) => {
            return response.json();
          }).then((json) => {
        console.log(json.address.state);
        this.city = json.address.state
      });
    },
    onSuccess(geo) {
      console.log(geo);
      const lat = geo.coords.latitude;
      const long = geo.coords.longitude;
      this.reverseGeocode([long, lat])
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  padding: 20px;
}

.header__title {
  margin-top: 0;
  color: white;
  font-weight: 500;
  text-transform: uppercase;
}

.header__city {
  margin-top: 0;
  color: white;
  font-weight: 500;
  //text-transform: uppercase;
  display: block;
  position: relative;
  margin-left: auto;
  font-size: 20px;
  align-self: center;

  &::before {
    content: "";
    position: absolute;
    top: 2px;
    left: -27px;
    background: url("../assets/img/icon-pin.png") no-repeat;
    background-size: cover;
    width: 20px;
    height: 20px;
  }
}
</style>