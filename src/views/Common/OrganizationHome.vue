<template>
  <main class="admin_subject-edit content content_cabinet">
    <router-view />
  </main>
</template>
<script>
import { createNamespacedHelpers } from "vuex";

const {
  mapActions: mapActionsOrganizations,
  mapMutations: mapMutationsOrganizations,
} = createNamespacedHelpers("subjects/organization");

export default {
  name: "cabinet-organization-edit-home",
  methods: {
    ...mapActionsOrganizations(["fetchOrganization", "fetchRegion"]),
    ...mapMutationsOrganizations(["setOrganizationId", "setRegionId"]),
  },
  created() {
    this.setRegionId(this.$route.params.regionId);
    this.fetchRegion();
    if (this.$route.params.organizationId) {
      this.setOrganizationId(this.$route.params.organizationId);
      this.fetchOrganization();
    }
  },
};
</script>
