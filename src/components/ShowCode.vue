<template>
  <v-sheet class="ma-4">
    <v-tabs v-model="tab" background-color="primary" dark>
      <v-tab v-for="item in codes" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in codes" :key="item.tab">
        <v-card flat>
          <highlight-code lang="cpp">{{ item.content }}</highlight-code>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-sheet>
</template>

<script>
import octokit from "../../gitconfig";

const config = require("../../config.json");
// "#include<stdio.h> \n\nusing namespace std;\n\nint main()\n{\n\tcout<<'Hello World'<<endl;\n}"
export default {
  name: "ShowCode",
  props: ["codetitle"],
  data: () => ({
    tab: null,
    codes: []
  }),
  async created() {
    const rp = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: config.username,
        repo: config.reponame,
        path: this.codetitle
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
        langname: toString(code.name).toLowerCase(),
        path: code.path,
        content: (await cd.text()).toString()
      });
    });
  }
};
</script>
