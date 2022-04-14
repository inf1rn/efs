<template>
  <div class="tabs__body _tabs-block">
    <div class="admin_subject-edit__body row-spollers width_m">
      <div class="spollers _spoller-init">
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
            setNewOrganizationEmployeeImg({
              image: $event,
              id: mainEmployee.id,
            })
          "
          :employee="mainEmployee"
        />
      </div>
      <div class="admin_subject-edit__btn admin_subject-edit_add-btn">
        <button
          type="submit"
          class="
            button
            button_theme_green--empty
            button_border_small
            form__submit
          "
          @click="
            () =>
              createNewOrganizationEmployee({
                position: '',
                name: '',
                description: '',
                sort: 2,
                img: null,
              })
          "
        >
          Добавить сотрудника
        </button>
      </div>
      <div class="spollers _spoller-init">
        <cabinet-employee-field
          class="spollers__item"
          v-for="employee of getEmployeesBySort(2)"
          :key="employee.id"
          :employee="employee"
          @change-employee-name="
            setNewOrganizationEmployeeName({
              name: $event,
              id: employee.id,
            })
          "
          @change-employee-description="
            setNewOrganizationEmployeeDescription({
              description: $event,
              id: employee.id,
            })
          "
          @change-employee-position="
            setNewOrganizationEmployeePosition({
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
        @click="createOrganization()"
        :class="{ disabled: getIsDisabled }"
        :disabled="getIsDisabled"
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
  mapState: mapStateNewOrganization,
  mapMutations: mapMutationsNewOrganization,
  mapActions: mapActionsNewOrganization,
  mapGetters: mapGettersNewOrganization,
} = createNamespacedHelpers("subjects/organization/newOrganization");

export default {
  name: "cabinet-organization-edit-employees",
  components: { CabinetEmployeeField, CabinetMainEmployeeField },
  computed: {
    ...mapStateNewOrganization({
      newOrganization: (state) => state.newOrganization,
    }),
    ...mapGettersNewOrganization(["getEmployeesBySort"]),
    mainEmployee() {
      return this.getEmployeesBySort(1)[0];
    },
    ...mapGettersNewOrganization(["getIsDisabled"]),
  },
  methods: {
    ...mapMutationsNewOrganization([
      "setNewOrganizationEmployeeDescription",
      "setNewOrganizationEmployeeName",
      "setNewOrganizationEmployeePosition",
      "setNewOrganizationEmployeeImg",
      "createNewOrganizationEmployee",
    ]),
    ...mapActionsNewOrganization(["createOrganization"]),
  },
  created() {
    console.log(this.formOrganization);
  },
};
</script>