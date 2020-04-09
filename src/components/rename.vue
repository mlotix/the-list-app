<template lang="html">
  <div class="rename-bg" @click.self.stop="closeRename()">
    <div class="rename-wrapper" @click.stop="">
      <div class="rename-icon">
        <fa-icon icon="times" @click.stop="closeRename()"></fa-icon>
      </div>
      <div class="rename-content">
        <h5 class="text-center">Enter new name:</h5>
        <input v-model.trim="newName" @keyup.enter="saveRename" placeholder="Enter name..." value="list.title" class="rename-input"/>
        <div class="rename-button-wrapper">
          <button @click.stop="saveRename" type="button" class="btn btn-dark rename-button">Save changes</button>
        </div>
      </div>
      <p>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      newName: this.list.title
    }
  },
  methods: {
    closeRename() {
      this.$emit('close-rename')
    },
    saveRename() {
      if(this.newName && this.newname !==''){
        this.$emit('save-rename', this.newName)
        this.closeRename()
      }
    }
  }
}
</script>

<style lang="css" scoped >
.rename-bg {
  background-color: rgba(0, 0, 0, 0.35);
  width: 100%;
  height: 100%;
  position: fixed;
  top:0;
  left:0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  cursor: default;
}
.rename-wrapper {
  display: block;
  margin: auto;
  width:400px;
  max-width: 90%;
  height: auto;
  background-color: white;
  padding: 20px 30px;
  border-radius: 8px;
  -webkit-box-shadow: 0px 0px 8px -2px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 8px -2px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 8px -2px rgba(0,0,0,0.55);
}
.rename-input {
  background-color: #FFF8F3;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  padding: 6px 10px;
  -webkit-box-shadow: 0px 0px 8px -3px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 8px -3px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 8px -3px rgba(0,0,0,0.55);
}
.rename-content {
  margin-top: 20px;
}
.rename-icon {
  float: right;
  font-size: 20px;
}
.rename-icon:hover, .rename-icon:focus {
  color:gray;
  cursor: pointer;
}
.rename-button {
  margin: 20px 20px 0 20px;
}
.rename-button-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
