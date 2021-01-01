<template>
  <v-container fluid>
    <div class="text-h4 ma-4">HELLO WORLD</div>
    <show-code />
  </v-container>
</template>

<script>
import ShowCode from "../components/ShowCode.vue";
export default {
  components: { ShowCode },
  name: "Home"
};
</script>
