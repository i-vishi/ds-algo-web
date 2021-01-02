<template>
  <v-container fluid>
    <div class="text-h4 ma-4">{{ this.codetitle }}</div>
    <show-code :codetitle="this.pathname" :codes="this.codes" />
  </v-container>
</template>

<script>
import ShowCode from "../components/ShowCode.vue";
import octokit from "../../gitconfig";

const config = require("../../config.json");

export default {
  components: { ShowCode },
  name: "Algos",
  data() {
    return {
      pathname: "",
      codetitle: "",
      codes: []
    };
  },
  watch: {
    "$route.params.pathname": function() {
      this.changecontent();
    }
  },
  created() {
    this.changecontent();
  },
  methods: {
    async changecontent() {
      this.pathname = this.$route.params.pathname;
      this.codetitle = this.$route.params.pathname.toUpperCase();
      const rp = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner: config.username,
          repo: config.reponame,
          path: this.pathname
        }
      );
      this.codes = [];
      rp.data.forEach(async code => {
        const fl = await octokit.request(
          "GET /repos/{owner}/{repo}/contents/{path}",
          {
            owner: config.username,
            repo: config.reponame,
            path: code.path
          }
        );
        const cd = await fetch(fl.data[0].download_url);
        this.codes.push({
          tab: code.name,
          langname: code.name.toLowerCase(),
          path: code.path,
          content: (await cd.text()).toString()
        });
      });
    }
  }
};
</script>
