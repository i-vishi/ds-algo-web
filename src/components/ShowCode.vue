<template>
  <v-sheet class="ma-4">
    <v-tabs v-model="tab" background-color="primary" dark>
      <v-tab v-for="item in codes" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in codes" :key="item.tab">
        <v-card flat class="text-h7">
          <highlight-code :lang="item.langname">{{
            item.content
          }}</highlight-code>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-sheet>
</template>

<script>
export default {
  name: "ShowCode",
  props: ["codetitle", "codes"],
  data: () => ({
    tab: null
  })
};
</script>
