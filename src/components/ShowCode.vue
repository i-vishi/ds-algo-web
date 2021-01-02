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
        <v-card flat class="text-h7 ma-6" color="#040404">
          <highlight-code :lang="item.langname">{{
            item.content
          }}</highlight-code>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <v-divider />
    <v-card-actions>
      <v-btn color="green" text @click="compileCode">
        Run
      </v-btn>
      <v-spacer />
      <v-btn color="red" text @click="compileShow = false" v-show="compileShow">
        Close
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="compileShow">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he
          could deliver. You won't have time for sleeping, soldier, not with all
          the bed making you'll be doing. Then we'll go with that data file!
          Hey, you add a one and two zeros to that or we walk! You're going to
          do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "ShowCode",
  props: ["codetitle", "codes"],
  data: () => ({
    tab: null,
    compileShow: false,
    compileResult: ""
  }),
  methods: {
    compileCode() {
      this.compileShow = true;
    }
  }
};
</script>
