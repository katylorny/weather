<template>
  <div class="days">
    <div class="days__buttons">
      <radio-button
          v-for="(type, i) in weatherInfoTypes"
          :key="i"
          v-model="selectedType"
          name="type"
          :value="type"
      >
        {{ type }}
      </radio-button>
    </div>


    <div class="days__list" v-if="!locationStatus.isError">
      <day v-for="(weatherDay, n) in fakeWeather" :key="n"
           :selected-type="selectedType"
           :temperature="weatherDay.temperature"
           :humidity="weatherDay.humidity"
           :pressure="weatherDay.pressure"
           :wind="weatherDay.wind"
           :img="weatherDay.icon"
           :date="weatherDay.date"
      />
    </div>
    <div v-else class="days__show-moscow-weather">
      <p>We don't know where you are.</p>
      <button @click="onShowMoscowWeatherButtonClick"> Show weather in Moscow </button>
    </div>
  </div>
</template>

<script>
import Day from "./Day";
import RadioButton from "./RadioButton";
import {mapActions, mapState} from "vuex";
import {MOSCOW} from "../common/helpers";

export default {
  name: "Days",
  components: {
    RadioButton,
    Day
  },
  data() {
    return {
      weatherInfoTypes: [`Temperature`, `Air humidity`, `Atmosphere pressure`, `Wind speed`],
      selectedType: `Temperature`
    }
  },
  computed: {
    ...mapState([
        `locationStatus`
    ]),
    fakeWeather() {
      return this.$store.getters.fakeWeather
    },

  },
  methods: {
    ...mapActions([
        'setWeatherData'
    ]),
    onShowMoscowWeatherButtonClick() {
      this.setWeatherData(MOSCOW)
    }
  }
}
</script>

<style lang="scss" scoped>

.days {
  margin-top: auto;
  height: 200px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(5px);
  display: flex;
  color: white;
  justify-content: stretch;
  background-color: #0000006e;

  @media (max-width: 767px) {
    height: unset;
    flex-direction: column;
    flex-grow: 1;
  }
}

.days__buttons {
  padding: 30px;
  min-width: 200px;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.days__list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  flex-grow: 1;

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    margin-left: 1px;
  }
}

.days__show-moscow-weather {
  width: fit-content;
  align-self: center;
  margin: auto;
  margin-right: 50vw;
  transform: translateX(50%);

  button {
    border-radius: 5px;
    border: 2px solid black;
    padding: 9px;
    background: white;
    cursor: pointer;
    transition: all 300ms ease;
    font-weight: 600;

    &:hover {
      transform: scale(1.1);
    }
  }
}


</style>