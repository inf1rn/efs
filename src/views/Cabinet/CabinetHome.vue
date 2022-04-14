<template>
  <cabinet-header />
  <div class="page__content-wrapper">
    <cabinet-sidebar />
    <router-view />
  </div>
  <cabinet-footer />
</template>
<script>
import CabinetFooter from "@/components/Cabinet/CabinetFooter.vue";
import CabinetHeader from "@/components/Cabinet/CabinetHeader.vue";
import CabinetSidebar from "@/components/Cabinet/CabinetSidebar.vue";
import { createNamespacedHelpers } from "vuex";

const { mapState: mapStateAccount } = createNamespacedHelpers("account");
const { mapState: mapStateAuth } = createNamespacedHelpers("auth");

export default {
  name: "Cabinet",
  components: { CabinetSidebar, CabinetHeader, CabinetFooter },
  computed: {
    ...mapStateAccount({
      permissions: (state) => state.userData.permissions,
      roles: (state) => state.userData.roles.map((role) => role.name),
      region: (state) => state.userData.region,
    }),
    ...mapStateAuth({
      auth: (state) => state.auth,
    }),
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      //TODO: user enter in page then he rederecting to /cabinet!
      const store = vm.$store.state;
      if (!store.auth.auth) {
        vm.$router.push("/");
        return;
      }

      const { requiredRoles, requiredPermissions, lockedRoles, onlyOwnRegion } =
        to.meta;
      let { roles, permissions, region } = vm.$store.state.account.userData;

      roles = roles.map((role) => role.name);

      if (
        onlyOwnRegion?.some((role) => roles.includes(role)) &&
        region.id !== +to.params.regionId
      ) {
        vm.$router.push("/cabinet");
        return;
      }

      if (lockedRoles?.some((lockedRole) => roles.includes(lockedRole))) {
        vm.$router.push("/cabinet");
        return;
      }

      if (requiredRoles) {
        if (
          !requiredRoles?.every((requiredRole) => roles.includes(requiredRole))
        ) {
          vm.$router.push("/cabinet");
          return;
        }
      }

      if (requiredPermissions) {
        if (
          !requiredPermissions?.every((requiredPermission) =>
            permissions.includes(requiredPermission)
          )
        ) {
          vm.$router.push("/cabinet");
          return;
        }
      }
      vm.$router.push(to);
    });
  },
  beforeRouteUpdate(to, from) {
    if (!this.auth) {
      this.$router.push("/");
      return;
    }

    const { requiredRoles, requiredPermissions, onlyOwnRegion, lockedRoles } =
      to.meta;
    if (requiredRoles) {
      if (
        !requiredRoles?.every((requiredRole) =>
          this.roles.includes(requiredRole)
        )
      ) {
        this.$router.push("/cabinet");
        return;
      }
    }

    console.log(this.region.id);
    console.log(this.roles);
    if (
      onlyOwnRegion?.some((role) => this.roles.includes(role)) &&
      this.region.id !== +to.params.regionId
    ) {
      this.$router.push("/cabinet");
      return;
    }

    if (lockedRoles?.some((lockedRole) => this.roles.includes(lockedRole))) {
      this.$router.push("/cabinet");
      return;
    }

    if (requiredPermissions) {
      if (
        !requiredPermissions?.every((requiredPermission) =>
          this.permissions.includes(requiredPermission)
        )
      ) {
        console.log(from);
        this.$router.push("/cabinet");
        return;
      }
    }
  },
};
</script>