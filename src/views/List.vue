<template lang="html">
  <div class="container-fluid view-wrapper" v-if="list">
    <div class="row">
      <div class="col-md-2 col-lg-3"></div>
      <div class="col col-md-8 col-lg-6">
        <transition name="fade" appear>
          <div class="list-wrapper">
            <div class="list-icons">
              <fa-icon @click.stop="closeList" class="list-icon" icon="times"/>
            </div>
            <div class="list-head">
              <h1 class="list-title"> {{ list.title }} </h1>
              <input class="list-add" placeholder="Add a new item..." @keyup.enter="addNewItem($event, list.items)"/>
            </div>
            <div class="list-body">
              <draggable :list="list.items" group="items" v-bind="dragOptions">
                <transition-group type="transition" name="moveItem">
                  <div class="list-item" v-for="(item, $index) in list.items"  :key="$index"
                  @click="openItemModal(item.id)">
                  <div class="item-body">
                    <div class="item-text-wrap" style="display:inline-block">
                      <h4 class="item-cut">{{ item.name }}</h4>
                      <p class="item-cut" v-if="item.desc">{{ item.desc }}</p>
                    </div>
                    <div class="item-icons">
                      <fa-icon @click.stop="checkItem(list.items, $index, list.checked)" class="item-single-icon" icon="check"/>
                      <fa-icon @click.stop="removeItem(list.items, $index)" class="item-single-icon" icon="trash"/>
                    </div>
                  </div>
                </div>
              </transition-group>
            </draggable>
          </div>
          <div v-if="list.checked.length > 0" class="list-checked">
            <h3 class="checked-title">Checked off</h3>
            <draggable :list="list.checked" group="items" v-bind="dragOptions">
              <transition-group type="transition" name="moveItem">
                <div class="checked-item" v-for="(check, $indexChecked) in list.checked"  :key="$indexChecked"
                @click="openItemModal(check.id)">
                <div class="checked-text-wrap" style="display:inline-block">
                  <h4 class="checked-name">{{ check.name }}</h4>
                  <p v-if="check.desc" class="checked-desc">{{ check.desc }}</p>
                </div>
                <div class="item-icons">
                  <fa-icon @click.stop="checkItem(list.checked, $indexChecked, list.items)" class="item-single-icon" icon="chevron-up"/>
                  <fa-icon @click.stop="removeItem(list.checked, $indexChecked)" class="item-single-icon" icon="trash"/>
                </div>
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>
        </transition>
      </div>
      <div class="col-md-2 col-lg-3"></div>
    </div>
    <transition name="fade">
      <div v-if="isItemOpen">
        <router-view/>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import draggable from 'vuedraggable'
export default {
  components: {
    draggable,
  },
  data () {
    return {
      newItem: ''
    }
  },
  methods: {
    addNewItem(e, items) {
      const newItem = e.target.value.trim()
      if(newItem !== '' && newItem !== ' ' && newItem) {
        this.$store.commit('ADD_ITEM_TO_LIST', { newItem, items })
        e.target.value = ''
      }
    },
    removeItem(items, itemIndex) {
      this.$store.commit('REMOVE_ITEM_FROM_LIST', { items, itemIndex })
    },
    checkItem(oldList, itemIndex, newList) {
      this.$store.commit('CHECK_ITEM', { oldList, itemIndex, newList })
    },
    openItemModal(itemID) {
      this.$router.push({ name: 'item', params: {itemID: itemID}})
    },
    closeList() {
      this.$router.push({ name: 'Lists' })
    }
  },
  computed: {
    ...mapGetters(['getList']),
    list() {
      if(this.getList(this.$route.params.id)) {
        return this.getList(this.$route.params.id)
      }
      return null
    },
    dragOptions() {
      return {
        animation: 200,
        group: "items",
        disabled: false,
        ghostClass: "ghost",
        delay: 100,
        delayOnTouchOnly: true
      }
    },
    isItemOpen() {
      return this.$route.name === 'item'
    }
  },
  created () {
    if(!this.getList(this.$route.params.id)) {
      this.$router.push({ name: 'Lists' })
    }
  },
  mounted: function() {
      document.title = this.list.title + " | The List App"
  }
}
</script>

<style lang="css" scoped >
.list-wrapper {
  box-sizing: border-box;
  background-color: white;
  margin: 75px 5px;
  padding: 20px 20px;
  -webkit-box-shadow: 0px 0px 8px -2px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 8px -2px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 8px -2px rgba(0,0,0,0.55);
}
.list-icons {
  font-size: 26px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding-right: 10px;
  margin-bottom: 10px;
}
.list-icon:hover, .list-icon:focus {
  color: gray;
  cursor: pointer;
}
.list-title {
  text-align: center;
  font-weight: 600;
}
.list-head {
  margin-bottom: 25px;
}
.list-add {
  margin-top: 10px;
  font-size: 1.5rem;
  padding: 10px;
  box-sizing: border-box;
  width: 90%;
}
.list-item h4, .list-item p {
  margin: 0;
}
.list-item {
  padding: 12px 10px;
}
.list-item:hover, .list-item:focus, .list-item:active {
  background-color: #FFF8F3;
}
.item-icons {
  font-size: 20px;
  color: #A6ACAF;
  float: right;
  display: inline-block;
}
.item-single-icon {
  margin-left:16px;
}
.item-single-icon:hover, .item-single-icon:focus, .item-single-icon:active {
  color: #000;
  cursor: pointer;
}
.list-checked {
  margin: 25px 0px;
}
.checked-title {
  text-align: center;
}
.checked-name {
  margin:0;
  display: inline;
  text-decoration: line-through;
}
.checked-desc {
  margin: 0;
}
.checked-item {
  color: #A6ACAF;
  padding: 12px 10px;
}
.checked-item:hover, .checked-item:focus, .checked-item:active {
  background-color: #FFF8F3;
  color: #000;
}
.checked-item:hover .checked-name, .checked-item:focus .checked-name, .checked-item:active .checked-name {
  text-decoration: none;
}
.moveItem-move {
  transition: all 0.5s;
}
.item-text-wrap, .checked-text-wrap {
  width: calc(100% - 70px);
}
.item-cut, .checked-name, .checked-desc {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 95%;
}
</style>
