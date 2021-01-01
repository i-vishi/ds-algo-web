<template>
  <v-sheet class="ma-4">
    <v-tabs v-model="tab" background-color="primary" dark>
      <v-tab v-for="item in langTabs" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in langTabs" :key="item.tab">
        <v-card flat>
          <vue-code-highlight language="javascript">
            <pre>{{ item.content }}</pre>
          </vue-code-highlight>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-sheet>
</template>

<script>
import { component as VueCodeHighlight } from "vue-code-highlight";

import "prism-es6/components/prism-markup-templating";
import "prism-es6/components/prism-cpp";

export default {
  name: "ShowCode",
  components: { VueCodeHighlight },

  data: () => ({
    tab: null,
    langTabs: [
      {
        tab: "C",
        content:
          "#include<stdio.h> \n\nusing namespace std;\n\nint main()\n{\n\tcout<<'Hello World'<<endl;\n}"
      },
      { tab: "C++", content: "Tab 2 Content" },
      { tab: "Python 3", content: "Tab 3 Content" },
      { tab: "Java", content: "Tab 4 Content" },
      { tab: "Golang", content: "Tab 5 Content" }
    ]
  })
};
</script>
