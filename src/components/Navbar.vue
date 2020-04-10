<template lang="html">
  <div class="main-menu">
    <nav class="navbar navbar-expand-md">
      <ul class="navbar-nav">
        <li class="nav-link"><router-link class="text-dark" :to="{ name: 'Home'}">Home</router-link></li>
        <li class="nav-link"><router-link class="text-dark" :to="{ name: 'Lists' }">Lists</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="css" scoped>
.main-menu {
  background-color:#fff;
  padding: 10px 30px;
  -webkit-box-shadow: 0px -2px 8px 1px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px -2px 8px 1px rgba(0,0,0,0.75);
  box-shadow: 0px -2px 8px 1px rgba(0,0,0,0.75);
}
.nav-link {
  font-size: 18px;
  color: black;
}
</style>
