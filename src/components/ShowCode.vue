<template>
  <v-card class="ma-6" elevation="5">
    <v-tabs v-model="tab" background-color="primary" dark>
      <v-tab v-for="item in codes" :key="item.langname">
        {{ item.langname }}
      </v-tab>
    </v-tabs>
    <v-skeleton-loader
      class="px-6 py-10"
      max-width="400"
      type="paragraph, paragraph"
      v-show="codes.length == 0"
    ></v-skeleton-loader>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in codes" :key="item.langname">
        <v-card flat>
          <v-card-text class="text-body-1 px-6 py-10">
            <highlight-code :lang="hlLangs[item.langname]">{{
              item.content
            }}</highlight-code>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-btn
              color="green"
              text
              @click="compileCode(item.langname, item.content)"
            >
              Run
            </v-btn>
            <v-spacer />
            <v-btn color="red" text @click="closeCompile" v-show="compileShow">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-expand-transition>
          <div v-show="compileShow">
            <v-divider></v-divider>

            <v-card-text>
              <div v-show="compileStatus !== 'none'" class="text-overline">
                <span class="green--text">{{
                  statusMessage[compileStatus]
                }}</span>
              </div>
              <div v-show="compileStatus === 'completed'" class="text-overline">
                ---------<br />output<br />---------
              </div>
              <div
                v-show="compileStatus === 'completed'"
                class="text-body-2 my-3 compile-output"
                v-text="compileResult.stdout"
              ></div>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
const axios = require("axios");
export default {
  name: "ShowCode",
  props: ["codetitle", "codes"],
  data: () => ({
    tab: null,
    currTab: null,
    compileShow: false,
    compileResult: {},
    compileStatus: "none",
    statusMessage: {
      completed: "Successfully Compiled",
      running: "Compiling Code...",
      error: "Error compiling code...",
    },
    hlLangs: {
      c: "c",
      cpp: "cpp",
      python3: "python",
      java: "java",
      golang: "go",
    },
  }),
  updated() {
    if (this.currTab !== this.tab) {
      this.currTab = this.tab;
      this.compileShow = false;
    }
  },
  methods: {
    async compileCode(langname, srcCode) {
      this.compileShow = true;
      let submitId = "";
      this.compileStatus = "running";
      await axios
        .post("http://api.paiza.io:80/runners/create", {
          source_code: srcCode,
          language: langname,
          api_key: "guest",
        })
        .then((res) => {
          submitId = res.data.id;
          this.compileStatus = res.data.status;
        });
      while (this.compileStatus !== "completed") {
        await axios
          .get("http://api.paiza.io:80/runners/get_status", {
            params: { id: submitId, api_key: "guest" },
          })
          .then((res) => {
            this.compileStatus = res.data.status;
          });
      }
      await axios
        .get("http://api.paiza.io:80/runners/get_details", {
          params: { id: submitId, api_key: "guest" },
        })
        .then((res) => {
          this.compileResult = res.data;
        });
    },
    closeCompile() {
      this.compileShow = false;
      this.compileResult = {};
      this.compileStatus = "none";
    },
  },
};
</script>
<style scoped>
.compile-output {
  white-space: pre;
}
</style>
