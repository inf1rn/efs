<template>
  <div class="tabs__body _tabs-block">
    <form
      @submit.prevent
      class="admin_subject-edit__body row-spollers width_m form"
    >
      <div class="admin_subject-edit__btn admin_subject-edit_add-btn">
        <button
          type="submit"
          class="
            button
            button_theme_green--empty
            button_border_small
            form__submit
          "
          @click="() => createFormOrganizationProgram({ link: '', title: '' })"
        >
          Добавить программу
        </button>
      </div>
      <cabinet-program-field
        class="admin_subject-edit__block block_white"
        v-for="program of formOrganization?.education_programs"
        :key="program.id"
        :program="program"
        @change-program-title="
          setFormOrganizationProgramTitle({ title: $event, id: program.id })
        "
        @change-program-link="
          setFormOrganizationProgramLink({ link: $event, id: program.id })
        "
        @duplicate-program="createFormOrganizationProgram($event)"
        @delete-program="deleteFormOrganizationProgram($event)"
      />
    </form>
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
import { createNamespacedHelpers } from "vuex";
import CabinetProgramField from "@/components/Cabinet/CabinetProgramField";

const {
  mapState: mapStateEditOrganization,
  mapMutations: mapMutationsEditOrganization,
  mapActions: mapActionsEditOrganization,
} = createNamespacedHelpers("subjects/organization/organizationEdit");

export default {
  name: "cabinet-organization-edit-programs",
  components: { CabinetProgramField },
  computed: {
    ...mapStateEditOrganization({
      formOrganization: (state) => state.formOrganization,
    }),
  },
  methods: {
    ...mapMutationsEditOrganization([
      "setFormOrganizationProgramLink",
      "setFormOrganizationProgramTitle",
      "createFormOrganizationProgram",
      "deleteFormOrganizationProgram",
    ]),
    ...mapActionsEditOrganization(["updateOrganization"]),
  },
};
</script>