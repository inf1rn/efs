<template>
  <div class="tabs__body _tabs-block">
    <div class="admin_subject-edit__body row-spollers width_m">
      <div class="spollers _spoller-init" v-if="mainEmployee">
        <cabinet-main-employee-field
          @change-employee-name="
            setNewOrganizationEmployeeName({
              name: $event,
              id: mainEmployee.id,
            })
          "
          @change-employee-description="
            setNewOrganizationEmployeeDescription({
              description: $event,
              id: mainEmployee.id,
            })
          "
          @change-employee-img="
            setFormOrganizationEmployeeImg({
              image: $event,
              id: mainEmployee.id,
            })
          "
          :employee="mainEmployee"
        />
      </div>

      <div class="spollers _spoller-init">
        <cabinet-employee-field
          class="spollers__item"
          v-for="employee of getEmployeesBySort(2)"
          :key="employee.id"
          :employee="employee"
          @change-employee-name="
            setFormOrganizationEmployeeName({
              name: $event,
              id: employee.id,
            })
          "
          @change-employee-description="
            setFormOrganizationEmployeeDescription({
              description: $event,
              id: employee.id,
            })
          "
          @change-employee-position="
            setFormOrganizationEmployeePosition({
              position: $event,
              id: employee.id,
            })
          "
        />
      </div>
    </div>
    <div class="admin_subject-edit__btn">
      <button
        type="submit"
        class="button button_theme_green button_border_small form__submit"
        @click="updateOrganization()"
      >
        Сохранить
      </button>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers, mapMutations } from "vuex";
import CabinetEmployeeField from "@/components/Cabinet/CabinetEmployeeField";
import CabinetMainEmployeeField from "@/components/Cabinet/CabinetMainEmployeeField";

const {
  mapState: mapStateEditOrganization,
  mapMutations: mapMutationsEditOrganization,
  mapActions: mapActionsEditOrganization,
  mapGetters: mapGettersEditOrganization,
} = createNamespacedHelpers("subjects/organization/organizationEdit");

export default {
  name: "cabinet-organization-edit-employees",
  components: { CabinetEmployeeField, CabinetMainEmployeeField },
  computed: {
    ...mapStateEditOrganization({
      formOrganization: (state) => state.formOrganization,
    }),
    ...mapGettersEditOrganization(["getEmployeesBySort"]),
    mainEmployee() {
      return this.getEmployeesBySort(1)?.[0];
    },
  },
  methods: {
    ...mapMutationsEditOrganization([
      "setFormOrganizationEmployeeDescription",
      "setFormOrganizationEmployeeName",
      "setFormOrganizationEmployeePosition",
      "setFormOrganizationEmployeeImg",
    ]),
    ...mapActionsEditOrganization(["updateOrganization"]),
  },
};
</script>