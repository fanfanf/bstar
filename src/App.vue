<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@font-face {
  font-family:'HelveticaNeue';
  src: url('./assets/fonts/HelveticaNeue.ttf'),
       url('./assets/fonts/LatoRegular.ttf');
       font-weight: normal;
       font-style: normal;
}
#app {
  width: 100%;
  height: 100%;
  color: white;
  font-family:'HelveticaNeue';
  min-width: 1080px;
  min-height: 700px;
}
.el-input__inner {
  height: 55px;
  border-radius: 30px;
  font-size: 20px;
  color: #555555;
  width: 586px;
}
</style>
