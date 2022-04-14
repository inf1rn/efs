<template>
  <public-header />
  <router-view />
  <public-footer />
</template>
<script>
import PublicHeader from "@/components/Public/PublicHeader.vue";
import PublicFooter from "@/components/Public/PublicFooter.vue";

export default {
  components: { PublicHeader, PublicFooter },
  name: "public",

};
</script>