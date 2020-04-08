import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import List from "../views/List.vue";
import Item from "../components/item.vue"
import Lists from "../views/Lists.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/list/:id",
    name: "List",
    component: List,
    children: [{
      path: 'item/:itemID',
      name: 'item',
      component: Item
    }]
  },
  {
    path: "/lists",
    name: 'Lists',
    component: Lists
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
