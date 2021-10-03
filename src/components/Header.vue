<template>
  <header class="header">
    <h1 class="header__title">
      Weather
    </h1>
    <p class="header__city">Moscow</p>

  </header>
</template>

<script>
export default {
  name: "Header"
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