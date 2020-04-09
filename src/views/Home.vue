<template lang="html">
  <div class="container-fluid">
    <div class="home-wrapper">
      <div class="home-title">
        <transition name="slide" appear>
          <h1>The List App</h1>
        </transition>
        <transition name="slide" appear>
          <h4>Keep things organized</h4>
        </transition>
      </div>
      <div class="home-button">
        <transition name="slide" appear>
          <router-link :to="{ name: 'Lists' }">
            <button type="button" class="btn btn-dark btn-lg">Open my lists</button>
          </router-link>
        </transition>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 col-lg-4"></div>
      <div class="col col-md-6 col-lg-4">
        <transition name="slide" appear>
          <img alt="Picture of iphone with list on it" src="@/assets/iphone.png" class="home-img"/>
        </transition>
      </div>
      <div class="col-md-3 col-lg-4"></div>
    </div>
    <div class="text-center pb-5">
      <h2>Try it now!</h2>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="css" scoped >
.home-title {
  margin: 50px 10px 25px 10px;
  text-align: center;
}
.home-wrapper, .home-button {
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
}
.home-img {
  max-width: 100%;
  box-sizing: border-box;
  padding: 20px;
}
</style>
