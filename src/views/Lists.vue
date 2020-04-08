<template lang="html">
  <div class="container-fluid">
    <div class="row">
      <div class="col col-md-8 col-lg-6">
        <div class="menu-card" v-for="(list, index) in lists"  :key="index">
          <div class="menu-card-body">
            <h4 class="menu-card-title"> {{ list.title }} </h4>
          </div>
          <div class="menu-card-link">
            <fa-icon icon="chevron-up"></fa-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['lists'])
  }
}
</script>

<style lang="css" scoped >

</style>
