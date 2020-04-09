import Vue from "vue";
import Vuex from "vuex";
import { generateID } from '@/generate'

Vue.use(Vuex);

const lists = [
  {
    title: 'My shopping list',
    id: '14ab98c',
    items: [
      {
        name: 'Bread',
        desc: 'Buy bread in walmart',
        id: '7be849cfa'
      },
      {
        name: 'Water',
        desc: 'Buy water in Target',
        id: '1828bda34b'
      },
      {
        name: 'Eggs',
        desc: 'Buy eggs in Whole Foods',
        id: '4bbc6a783e'
      }
    ],
    checked: []
  }
]
const store = new Vuex.Store({
  state: {
    lists
  },
  getters: {
    getList (state) {
      return (id) => {
        for (const list of state.lists) {
          if(list.id === id){
            return list
          }
        }
      }
    },
    getItem (state) {
      return (itemID) => {
        for (const list of state.lists) {
          for (const item of list.items) {
            if(itemID === item.id) {
              return item
            }
          }
          for(const check of list.checked) {
            if(itemID === check.id) {
              return check
            }
          }
        }
      }
    },
    getItems (state) {
      return (itemID) => {
        for (const list of state.lists) {
          for (const item of list.items) {
            if(itemID === item.id) {
              return list.items
            }
          }
          for(const check of list.checked) {
            if(itemID === check.id) {
              return list.checked
            }
          }
        }
      }
    }
  },
  mutations: {
    IMPORT_STATE_FROM_STORAGE(state) {
      if(localStorage.getItem('store')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store'))))
      }
    },
    ADD_ITEM_TO_LIST(state, { newItem, items }) {
      let item = {
        name: newItem,
        desc: '',
        id: generateID()
      }
      items.push(item)
    },
    REMOVE_ITEM_FROM_LIST(state, { items, itemIndex }) {
      items.splice(itemIndex, 1)
    },
    CHECK_ITEM(state, { oldList, itemIndex, newList }) {
      const checkedItem = oldList.splice(itemIndex, 1)[0]
      newList.push(checkedItem)
    },
    ADD_NEW_LIST(state, { lists, newList }) {
      const theList = {
        title: newList,
        id: generateID(),
        items: [],
        checked: []
      }

      lists.push(theList)
    }
  },
  actions: {
    deleteLocalStorage() {
      localStorage.setItem('store', null);
    }
  },
  modules: {}
});

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
});

export default store
