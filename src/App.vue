<template>
  <router-view v-if="initialized" />
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "App",
  methods: {
    ...mapActions({
      setInitialized: "setInitialized",
      getUser: "account/getUser",
      getRegions: "location/getRegions",
      getCities: "location/getCities",
      fetchPositions: "organizations/fetchPositions",
      fetchOrganizations: "organizations/fetchOrganizations",
      fetchMessages: "messages/messagesAll/fetchMessages",
      fetchRoles: "account/fetchRoles",
    }),
  },
  computed: {
    ...mapState({
      initialized: (state) => state.initialized,
    }),
  },
  async created() {
    if (document.cookie.includes("jwt") && document.cookie.includes("id")) {
      await this.getUser();
      this.fetchRoles();
      this.fetchMessages();
    }
    this.getRegions();
    this.getCities();
    this.fetchPositions();
    this.fetchOrganizations();
    this.setInitialized(true);
  },
};
</script>
<style>
@import "./assets/css/main.css";
</style>

