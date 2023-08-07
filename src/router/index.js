import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/HomeView.vue";
import Algos from "../views/AlgosView";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: Home,
  },
  {
    path: "/algos/:pathname",
    name: "AlgosView",
    component: Algos,
    meta: { reuse: false },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
