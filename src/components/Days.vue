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

    <div v-if="false" class="days__show-moscow-weather">
      <p>We don't know where you are.</p>
      <button> Show weather in Moscow </button>
    </div>
    <div class="days__list" v-if="true">
      <day v-for="(weatherDay, n) in fakeWeather" :key="n"
           :selected-type="selectedType"
           :temperature="weatherDay.temperature"
           :humidity="weatherDay.humidity"
           :pressure="weatherDay.pressure"
           :wind="weatherDay.wind"
           :img="weatherDay.icon"
           :date="weatherDay.date"
      ></day>
    </div>
  </div>
</template>

<script>
import Day from "./Day";
import RadioButton from "./RadioButton";

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
    fakeWeather() {
      return this.$store.getters.fakeWeather
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
    cursor: pointer;
  }
}


</style>