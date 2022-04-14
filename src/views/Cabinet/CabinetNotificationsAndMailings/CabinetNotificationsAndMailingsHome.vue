<template>
  <router-view />
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("notificationsAndMailings");

export default {
  name: "cabinet-notifications-and-mailings-home",
  methods: {
    ...mapActions(["fetchMailingFormData"]),
  },
  created() {
    this.fetchMailingFormData()
  }
};
</script>