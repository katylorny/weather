<template>
  <header class="header">
    <h1 class="header__title">
      Weather
    </h1>

    <div class="header__geo">
      <p class="header__city">
        {{ city }}
      </p>
      <p class="header__error" v-if="isError">
        Attention! {{ errorMessage }}
        <button type="button" class="header__refresh-button" @click="getCurrentPosition" v-if="isError">
          <img :src="refreshImg" alt="Refresh" width="15" height="15">
        </button>
      </p>

    </div>




  </header>
</template>

<script>
import refreshImg from "/src/assets/img/icon-reload.svg"

export default {
  name: "Header",
  data() {
    return {
      refreshImg,
      // city: `Allow access to geolocation`,
      city: `Moscow`,
      errorMessage: '',
      isError: false
    }
  },
  mounted() {
    this.getCurrentPosition()
  },
  methods: {
    getCurrentPosition() {
      navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError)
    },
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
      this.isError = false
      console.log(geo);
      const lat = geo.coords.latitude;
      const long = geo.coords.longitude;
      this.reverseGeocode([long, lat])
    },
    onError(error) {
      this.isError = true
      this.errorMessage = error.message
      // console.log(`error`, error.message);
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  padding: 20px;

  @media (max-width: 767px) {
    //align-items: center;
  }
}

.header__title {
  margin-top: 0;
  color: white;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 35px;

  @media (max-width: 767px) {
    font-size: 30px;
  }
}

.header__geo {
  margin-left: auto;
  display: flex;
  flex-direction: column;
}

.header__city {
  margin-top: 0;
  //margin: 0;
  color: white;
  font-weight: 500;
  //text-transform: uppercase;
  display: block;
  position: relative;
  font-size: 20px;
  padding-left: 27px;
  align-self: self-end;

  @media (max-width: 767px) {
    margin-top: 6px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 0;
    background: url("../assets/img/icon-pin.png") no-repeat;
    background-size: cover;
    width: 20px;
    height: 20px;
  }
}

.header__error {
  display: flex;
  color: red;
  margin: 0;

  @media (max-width: 767px) {
    max-width: 145px;
  }
}

.header__refresh-button {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  height: fit-content;
  transition: all 0.3s ease;
  margin: auto 0 auto 10px;

  &:hover {
    transform: scale(1.2);
  }

  &:active {
    transform: scale(0.8);
  }
}
</style>