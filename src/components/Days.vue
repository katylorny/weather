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
        {{type}}
      </radio-button>
    </div>

    <day v-for="n in 4" :key="n" :selected-type="selectedType"></day>
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
}

.days__buttons {
  padding: 30px;
  min-width: 200px;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

</style>