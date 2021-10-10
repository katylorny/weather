<template>
  <div class="day">
    <div class="day__title">
      {{ date }}
    </div>
    <div v-if="temperature" :class="['day__temperature', isActive(`Temperature`) ? `showed` : ``]">
      {{ temperature }}
    </div>
    <div v-else class="loader"/>
    <div v-if="humidity" :class="['day__humidity', isActive(`Air humidity`) ? `showed` : ``]">
      {{ humidity }}
    </div>

    <div v-if="pressure" :class="['day__pressure', isActive(`Atmosphere pressure`) ? `showed` : ``]">
      {{ pressure }}
    </div>

    <div v-if="wind" :class="['day__wind', isActive(`Wind speed`) ? `showed` : ``]">
      {{ wind }}
    </div>

    <div class="day__img">
      <img v-if="img" :src="`http://openweathermap.org/img/wn/${img}@2x.png`" alt="">
    </div>
  </div>
</template>

<script>
import cloudyIcon from "/src/assets/img/icon-cloudy.png";

export default {
  name: "Day",
  props: {
    selectedType: String,
    temperature: Number,
    pressure: Number,
    humidity: Number,
    wind: Number,
    icon: String,
    img: String,
    date: String
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

  @media (max-width: 767px) {
    margin-left: -1px;
    margin-top: -1px;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
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

  @media (max-width: 767px) {
    font-size: 50px;
  }

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

  @media (max-width: 767px) {
    font-size: 50px;
  }


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

  @media (max-width: 767px) {
    font-size: 50px;
  }

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

  @media (max-width: 767px) {
    font-size: 50px;
  }


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

  @media (max-width: 767px) {
    height: 60px;
  }
}

</style>