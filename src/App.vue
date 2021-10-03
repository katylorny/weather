<template>
  <div id="app">
    <v-main/>
  </div>
</template>

<script>

import Main from "./pages/Main";

export default {
  name: 'App',
  components: {
    VMain: Main
  }
}
</script>

<style lang="scss">

@import "assets/styles/style";

#app {
  font-family: "Dosis", Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

body {
  min-height: 100vh;
}

* {

}
</style>
