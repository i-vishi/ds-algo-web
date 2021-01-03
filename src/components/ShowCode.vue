<template>
  <v-card class="ma-4">
    <v-tabs v-model="tab" background-color="primary" dark>
      <v-tab v-for="item in codes" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>
    <v-skeleton-loader
      class="pa-6"
      max-width="400"
      type="paragraph, paragraph"
      v-show="codes.length == 0"
    ></v-skeleton-loader>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in codes" :key="item.tab">
        <v-card flat>
          <v-card-text class="text-body-1">
            <highlight-code :lang="item.langname">{{
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
            <v-btn
              color="red"
              text
              @click="compileShow = false"
              v-show="compileShow"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <v-expand-transition>
      <div v-show="compileShow">
        <v-divider></v-divider>

        <v-card-text>
          <div v-show="compileStatus !== 'none'" class="text-overline">
            <span class="green--text">{{ statusMessage[compileStatus] }}</span>
          </div>
          <div v-show="compileStatus === 'completed'" class="text-overline">
            ---------
          </div>
          <div v-show="compileStatus === 'completed'" class="text-overline">
            output
          </div>
          <div v-show="compileStatus === 'completed'" class="text-overline">
            ---------
          </div>
          <div v-show="compileStatus === 'completed'" class="text-body-2 my-3">
            {{ compileResult.stdout }}
          </div>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
const axios = require("axios");
export default {
  name: "ShowCode",
  props: ["codetitle", "codes"],
  data: () => ({
    tab: null,
    compileShow: false,
    compileResult: {},
    compileStatus: "none",
    statusMessage: {
      completed: "Successfully Compiled",
      running: "Compiling Code...",
      error: "Error compiling code..."
    }
  }),
  methods: {
    async compileCode(langname, srcCode) {
      this.compileShow = true;
      let submitId = "";
      await axios
        .post("http://api.paiza.io:80/runners/create", {
          source_code: srcCode,
          language: langname,
          api_key: "guest"
        })
        .then(res => {
          submitId = res.data.id;
          this.compileStatus = res.data.status;
        });
      while (this.compileStatus !== "completed") {
        await axios
          .get("http://api.paiza.io:80/runners/get_status", {
            params: { id: submitId, api_key: "guest" }
          })
          .then(res => {
            this.compileStatus = res.data.status;
          });
      }
      await axios
        .get("http://api.paiza.io:80/runners/get_details", {
          params: { id: submitId, api_key: "guest" }
        })
        .then(res => {
          this.compileResult = res.data;
        });
    }
  }
};
</script>
