<template>
  <v-container fluid px-14>
    <div class="text-h4 ma-6">{{ this.codetitle }}</div>
    <show-code :codetitle="this.pathname" :codes="this.codes" />
  </v-container>
</template>

<script>
import ShowCode from "../components/ShowCode.vue";
import { default as octokit, username, reponame } from "../../config";

export default {
  components: { ShowCode },
  name: "AlgosView",
  data() {
    return {
      pathname: "",
      codetitle: "",
      codes: [],
    };
  },
  watch: {
    "$route.params.pathname": function () {
      this.changecontent();
    },
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
          owner: username,
          repo: reponame,
          path: this.pathname,
        }
      );
      this.codes = [];
      rp.data.forEach(async (code) => {
        const fl = await octokit.request(
          "GET /repos/{owner}/{repo}/contents/{path}",
          {
            owner: username,
            repo: reponame,
            path: code.path,
          }
        );
        const cd = await fetch(fl.data[0].download_url);
        this.codes.push({
          tab: code.name,
          langname: code.name.toLowerCase(),
          path: code.path,
          content: (await cd.text()).toString(),
        });
      });
    },
  },
};
</script>
