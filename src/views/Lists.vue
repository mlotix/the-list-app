<template lang="html">
  <div class="container-fluid" @click="toggleDropdown(null)">
    <div class="row">
      <div class="col-md-2 col-lg-4"></div>
      <div class="col col-md-8 col-lg-4">
        <div class="menu-wrapper">
          <transition name="fade" appear>
            <h1 class="text-center mb-4">My Lists</h1>
          </transition>
          <transition-group name="slide" appear>
            <div class="menu-card" @click="goToList(list.id)" v-for="(list, $index) in lists"  :key="$index">
              <div class="menu-card-body">
                <h4 class="menu-card-title"> {{ list.title }} </h4>
                <p class="menu-card-element"> {{ list.items.length + list.checked.length }} elements </p>
              </div>
              <div class="menu-card-link">
                <div class="menu-card-icon" @click.stop="toggleDropdown($index)">
                  <fa-icon icon="ellipsis-v"></fa-icon>
                  <transition name="fade">
                    <div v-show="dropdown === $index" class="card-dropdown">
                      <a @click.prevent="toggleRename($index)" href="#" class="dropdown-link">Rename</a>
                      <a @click.prevent="removeList(lists, $index)" href="#" class="dropdown-link">Delete</a>
                    </div>
                  </transition>
                </div>
              </div>
              <transition name="fade">
                <template v-if="renameMode === $index">
                  <Rename :list="list" v-on:close-rename="toggleRename(null)" v-on:save-rename="saveRename($event, list)"/>
                </template>
              </transition>
            </div>
          </transition-group>
          <transition name="slide" appear>
            <div class="menu-card add-menu-card">
              <div class="menu-card-body new-card-body">
                <input @keyup.enter="addNewList(lists, $event)" class="menu-card-input" placeholder="Create a new list..." />
              </div>
            </div>
          </transition>
          <div>
            <p class="text-center">
              <a class="text-dark" href="" @click.prevent = "deleteData">
                Reset all data
              </a>
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-2 col-lg-4"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Rename from '@/components/rename'
export default {
  components: {
    Rename
  },
  data () {
    return {
      dropdown: null,
      renameMode: null
    }
  },
  computed: {
    ...mapState(['lists'])
  },
  methods: {
    goToList(id) {
      this.$router.push({ name: 'List', params: { id }})
    },
    addNewList(lists, e) {
      const newList = e.target.value.trim()
      if(newList && newList !=='' && newList !== ' ') {
        this.$store.commit('ADD_NEW_LIST', { lists, newList })
        e.target.value = ''
      }
    },
    removeList(lists, index) {
      this.$store.commit('REMOVE_ITEM_FROM_LIST', { items: lists, itemIndex: index})
    },
    deleteData() {
      if(confirm('Do you want to reset all your data?')) {
        this.$store.dispatch('deleteLocalStorage')
        this.$router.go()
      }
    },
    toggleDropdown(index) {
      if(this.dropdown === index) {
        this.dropdown = null
      }
      else {
        this.dropdown = index
      }
    },
    toggleRename(index) {
      if(this.renameMode === index) {
        this.renameMode = null
      }
      else {
        this.renameMode = index
      }
    },
    saveRename(name, list) {
      list.title = name
    }
  }
}
</script>

<style lang="css" scoped >
.menu-wrapper {
  padding: 50px 10px;
}
.menu-card {
  background-color: #fff;
  box-sizing: border-box;
  padding: 12px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  -webkit-box-shadow: 0px 0px 8px -2px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 8px -2px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 8px -2px rgba(0,0,0,0.55);
  margin: 20px 0;
}
.menu-card:hover, .menu-card:focus {
  background-color: #FFF8F3;
  cursor: pointer;
}
.add-menu-card:hover, .add-menu-card:focus {
  cursor: default;
}
.menu-card-link {
  box-sizing: border-box;
  display: inline-block;
  font-size: 1.5rem;
  margin-right: 5px;
}
.menu-card-icon {
  display: inline;
  padding: 5px;
}
.menu-card-icon:hover, .menu-card-icon:focus {
  color:gray;
}
.menu-card-body {
  box-sizing: border-box;
  display: inline-block;
  padding: 10px;
  max-width: calc(100% - 25px);
}
.new-card-body {
  width: 90%;
}
.menu-card-title {
  margin:0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: inherit;
}
.menu-card-element {
  margin: 0;
}
.menu-card-input {
  font-size: 1.5rem;
  width: 100%;
}
.card-dropdown {
  position: absolute;
  z-index: 1;
  background-color: #FFF8F3;
  padding: 20px;
  border-radius: 8px;
  -webkit-box-shadow: 0px 0px 8px -2px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 8px -2px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 8px -2px rgba(0,0,0,0.55);
  font-size: 17px;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  color: #000;
  min-width: 120px;
  right:0;
  margin: 5px;
}
.dropdown-link {
  color:#000;
}
</style>
