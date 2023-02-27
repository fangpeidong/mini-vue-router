<template>
  <div class="home">
    <h1>home</h1>
    <div id="nav">
      <router-link class="link" to="/a">a-comp</router-link>
      |
      <router-link class="link" to="/b">b-comp</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.link {
  color: black;

  font-size: 18px;
}
</style>
