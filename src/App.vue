<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h4">
            TOPICS
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item link to="/">
          <v-list-item-content>
            <v-list-item-title class="text-h6 font-weight-light">
              Hello World
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="item in topics"
          :key="item.title"
          link
          @click="handleChange(item.path)"
        >
          <v-list-item-content>
            <v-list-item-title class="text-h6 font-weight-light">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="text-h4 font-weight-light"
        >Data Structures and Algorithms</v-toolbar-title
      >
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { default as octokit, username, reponame } from "../config";

export default {
  data: () => ({
    drawer: null,
    topics: []
  }),
  async created() {
    const rp = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: username,
        repo: reponame,
        path: ""
      }
    );
    this.topics = [];
    console.log(rp.data);
    rp.data.forEach(d => {
      if (d.type == "dir" && d.name != "Hello World")
        this.topics.push({
          title: d.name,
          to: "/",
          path: d.path
        });
    });
  },
  methods: {
    handleChange(pathname) {
      this.$router
        .replace({ name: "Algos", params: { pathname: pathname } })
        .catch(() => {});
    }
  }
};
</script>
