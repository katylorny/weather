<template>
  <div class="day">
    <div class="day__title">
      Mon, 26
    </div>
    <div :class="['day__temperature', isActive(`Temperature`) ? `showed` : ``]">
      26
    </div>
    <div :class="['day__humidity', isActive(`Air humidity`) ? `showed` : ``]">
      50
    </div>
    <div :class="['day__pressure', isActive(`Atmosphere pressure`) ? `showed` : ``]">
      760
    </div>

    <div :class="['day__wind', isActive(`Wind speed`) ? `showed` : ``]">
      5
    </div>

    <div class="day__img">
      <img :src="cloudyIcon" alt="">
    </div>
  </div>
</template>

<script>
import cloudyIcon from "/src/assets/img/icon-cloudy.png";

export default {
  name: "Day",
  props: {
    selectedType: String
  },
  data() {
    return {
      cloudyIcon,
    }
  },
  methods: {
    isActive(type) {
      return type === this.selectedType
    }
  }
}
</script>

<style lang="scss" scoped>
.day {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-left: 1px solid #ffffff4a;
}

.day__title {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}

.day__temperature {
  width: fit-content;
  margin: auto;
  font-size: 70px;
  display: none;

  &::after {
    top: 0;
    right: -25px;
    content: "°";
    font-size: 60px;
  }
}

.day__humidity {
  display: none;
  margin: auto;
  font-size: 70px;


  &::after {
    top: 0;
    right: -25px;
    font-size: 30px;
    content: "%";
  }
}


.day__pressure {
  display: none;
  margin: auto;
  font-size: 70px;

  &::after {
    top: 0;
    right: -25px;
    content: "mm Hg";
    font-size: 15px;
  }
}

.day__wind {
  font-size: 70px;
  margin: auto;
  display: none;


  &::after {
    top: 37px;
    right: -52px;
    content: "m/s";
    font-size: 31px;
  }
}

.day__img {
  width: 40px;
  height: 40px;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.showed {
  display: flex;
  align-items: baseline;
}

</style>