import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Algos from "../views/Algos";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/algos/:pathname",
    name: "Algos",
    component: Algos,
    meta: { reuse: false }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
