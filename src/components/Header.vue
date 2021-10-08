<template>
  <header class="header">
    <h1 class="header__title">
      Weather
    </h1>

    <div class="header__geo">
      <p class="header__city">
        {{ city }}
      </p>
      <p class="header__error" v-if="locationStatus.isError">
        Attention! {{ locationStatus.errorMessage }}
        <button type="button" class="header__refresh-button" @click="getCurrentPosition" v-if="locationStatus.isError">
          <img :src="refreshImg" alt="Refresh" width="15" height="15">
        </button>
      </p>

    </div>


  </header>
</template>

<script>
import refreshImg from "/src/assets/img/icon-reload.svg"
import {mapState, mapActions} from "vuex/dist/vuex.mjs";

export default {
  name: "Header",
  data() {
    return {
      refreshImg,
    }
  },
  mounted() {
    this.getCurrentPosition()
  },
  computed: {
    ...mapState([
      'city',
      'locationStatus'
    ])
  },
  methods: {
    ...mapActions([
      'getCurrentPosition'
    ])
  },
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
  margin-bottom: 0;

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
  color: white;
  font-weight: 500;
  display: block;
  position: relative;
  font-size: 20px;
  padding-left: 27px;
  align-self: self-end;
  margin-bottom: 0;


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
  padding-top: 10px;
  padding-bottom: 10px;

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