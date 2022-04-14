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
          @click="() => createNewOrganizationProgram({ link: '', title: '' })"
        >
          Добавить программу
        </button>
      </div>
      <cabinet-program-field
        class="admin_subject-edit__block block_white"
        v-for="program of newOrganization?.education_programs"
        :key="program.id"
        :program="program"
        @change-program-title="
          setNewOrganizationProgramTitle({ title: $event, id: program.id })
        "
        @change-program-link="
          setNewOrganizationProgramLink({ link: $event, id: program.id })
        "
        @duplicate-program="createNewOrganizationProgram($event)"
        @delete-program="deleteNewOrganizationProgram($event)"
      />
    </form>
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
import { createNamespacedHelpers } from "vuex";
import CabinetProgramField from "@/components/Cabinet/CabinetProgramField";

const {
  mapState: mapStateNewOrganization,
  mapMutations: mapMutationsNewOrganization,
  mapActions: mapActionsNewOrganization,
  mapGetters: mapGettersNewOrganization,
} = createNamespacedHelpers("subjects/organization/newOrganization");

export default {
  name: "cabinet-organization-edit-programs",
  components: { CabinetProgramField },
  computed: {
    ...mapStateNewOrganization({
      newOrganization: (state) => state.newOrganization,
    }),
    ...mapGettersNewOrganization(["getIsDisabled"]),
  },
  methods: {
    ...mapMutationsNewOrganization([
      "setNewOrganizationProgramLink",
      "setNewOrganizationProgramTitle",
      "createNewOrganizationProgram",
      "deleteNewOrganizationProgram",
    ]),
    ...mapActionsNewOrganization(["createOrganization"]),
  },
};
</script>