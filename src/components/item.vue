<template lang="html">
  <div class="modal-bg" @click.self="closeModal">
    <div class="modal-wrapper">
      <div class="modal-close-wrapper" @click="closeModal">
        <fa-icon icon="times"></fa-icon>
      </div>
      <div class="modal-input-wrapper">
        <label for="name" class="modal-label">Title</label>
        <input name="name" v-model.trim="item.name" value="item.name" class="modal-title"/>
      </div>
      <div class="modal-input-wrapper">
        <label for="desc" class="modal-label">Description</label>
        <textarea name="desc" v-model.trim="item.desc" placeholder="Add a description..." value="item.desc" rows="6" class="modal-desc"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getItem', 'getItems']),
    item() {
      return this.getItem(this.$route.params.itemID)
    },
    items() {
      return this.getItems(this.$route.params.itemID)
    },
  },
  methods: {
    closeModal() {
      if(!this.item.name || this.item.name === '') {
        const itemIndex = this.items.findIndex (x => x.id === this.item.id)
        this.$store.commit('REMOVE_ITEM_FROM_LIST', { items: this.items, itemIndex })
      }
      this.$router.push({ name:'List', params: { id: this.$route.params.id }})
    }
  }
}
</script>

<style lang="css" scoped >
.modal-bg {
  background-color: rgba(0, 0, 0, 0.35);
  width: 100%;
  height: 100%;
  position: fixed;
  top:0;
  left:0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-wrapper {
  display: block;
  margin: auto;
  width:600px;
  max-width: 90%;
  height: auto;
  background-color: white;
  padding: 20px 30px;
  border-radius: 8px;
  -webkit-box-shadow: 0px 0px 8px -2px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 8px -2px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 8px -2px rgba(0,0,0,0.55);
}
.modal-input-wrapper {
  margin: 12px auto;
}
.modal-title, .modal-desc {
  background-color: #FFF8F3;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  padding: 6px 10px;
  -webkit-box-shadow: 0px 0px 8px -3px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 8px -3px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 8px -3px rgba(0,0,0,0.55);
}
.modal-desc {
  resize:none;
}
.modal-title {
  font-size: 1.5rem;
}
.modal-label {
  margin: 5px;
  font-size: 18px;
}
.modal-close-wrapper {
  float: right;
  font-size: 20px;
}
.modal-close-wrapper:hover, .modal-close-wrapper:focus {
  color: gray;
  cursor: pointer;
}
</style>
