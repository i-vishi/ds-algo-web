<template>
  <v-container fluid>
    <div class="text-h4 ma-4">HELLO WORLD</div>
    <show-code :codetitle="this.pathname" :codes="this.codes" />
  </v-container>
</template>

<script>
import ShowCode from "../components/ShowCode.vue";
import octokit from "../../gitconfig";

export default {
  components: { ShowCode },
  name: "Home",
  data() {
    return {
      pathname: "Hello World",
      codes: []
    };
  },
  async created() {
    const rp = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: process.env.GITHUB_USERNAME,
        repo: process.env.GITHUB_reponame,
        path: this.pathname
      }
    );
    this.codes = [];
    rp.data.forEach(async code => {
      const fl = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner: process.env.GITHUB_USERNAME,
          repo: process.env.GITHUB_reponame,
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
};
</script>
