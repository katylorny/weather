<template>
  <div class="day">
    <div class="day__title">
      Mon, 26
    </div>
    <div class="day__temperature">
      26
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
  data() {
    return {
      cloudyIcon,
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
  border-left: 1px solid white;
}

.day__title {
  margin-left: auto;
  margin-right: auto;
}

.day__temperature {
  position: relative;
  width: fit-content;
  margin: auto;
  font-size: 70px;

  &::after {
    position: absolute;
    top: 0;
    right: -25px;
    content: "°";
    font-size: 60px;
  }
}

.day__img {
  width: 40px;
  height: 40px;
  margin-left: auto;
  margin-right: auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

</style>