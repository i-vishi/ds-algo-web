import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import VueHighlightJS from "vue-highlight.js";
// Highlight.js languages (Only required languages)
import cpp from "highlight.js/lib/languages/cpp";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";

import "highlight.js/styles/vs2015.css";

Vue.use(VueHighlightJS, { languages: { cpp, java, javascript, python } });
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
