<template>
  <div class="tabs__body _tabs-block">
    <form class="admin_subject-edit__body width_m from">
      <div class="admin_subject-edit__block block_white">
        <div class="admin_subject-edit_tabs-form__line form__item">
          <label for="adminSubjectEditName" class="form__label"
            >Название организации ДПО</label
          >
          <input
            type="text"
            class="spollers-body__input form-input__border"
            id="adminSubjectEditName"
            placeholder="ИРО Сахалинской области"
            :value="newOrganization?.title_short"
            @input="setNewOrganizationTitleShort($event.target.value)"
          />
        </div>
      </div>
      <div class="admin_subject-edit__block block_white">
        <div class="admin_subject-edit_tabs-form__line form__item">
          <label for="adminSubjectEditFullname" class="form__label"
            >Полное наименование организации ДПО (по Уставу)</label
          >
          <input
            type="text"
            class="spollers-body__input form-input__border"
            id="adminSubjectEditFullname"
            placeholder="Институт развития образования Сахалинской области"
            :value="newOrganization?.title"
            @input="setNewOrganizationTitle($event.target.value)"
          />
        </div>
      </div>
      <div class="admin_subject-edit__block block_white">
        <div class="admin_subject-edit_tabs-form__line form__item">
          <label for="adminSubjectEditFullname" class="form__label"
            >Телефон</label
          >
          <div class="form__item-phone">
            <input
              type="text"
              class="spollers-body__input form-input__border _phone"
              id="adminSubjectEditFullname"
              :value="newOrganization?.phone"
              @input="setNewOrganizationPhone($event.target.value)"
            />
          </div>
        </div>
      </div>
      <div class="admin_subject-edit__block block_white">
        <div class="admin_subject-edit_tabs-form__line form__item">
          <label for="adminSubjectEditAddress" class="form__label"
            >Юридический адрес</label
          >
          <input
            type="text"
            class="spollers-body__input form-input__border"
            id="adminSubjectEditAddress"
            placeholder="Пограничная ул., 42, Южно-Сахалинск, Сахалинская обл."
            :value="newOrganization?.address"
            @input="setNewOrganizationAddress($event.target.value)"
          />
        </div>
      </div>
      <div class="admin_subject-edit__block block_white">
        <div class="admin_subject-edit_tabs-form__line form__item">
          <label for="adminSubjectEditEmail" class="form__label">Email</label>
          <input
            type="email"
            class="spollers-body__input form-input__border"
            id="adminSubjectEditEmail"
            placeholder="sahalineducation@gmail.com"
            :value="newOrganization?.email"
            @input="setNewOrganizationEmail($event.target.value)"
          />
        </div>
      </div>
      <div class="admin_subject-edit__block block_white" v-if="newOrganization">
        <div class="admin_subject-edit_tabs-form__line form__item">
          <label for="adminSubjectEditDesc" class="form__label">Описание</label>
          <QuilEditor
            :content="newOrganization?.description"
            contentType="html"
            ref="editor"
            id="adminSubjectEditDesc"
            @textChange="
              () => {
                setNewOrganizationDescription($refs.editor.getHTML());
              }
            "
          />
        </div>
      </div>
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
const {
  mapState: mapStateNewOrganization,
  mapMutations: mapMutationsNewOrganization,
  mapActions: mapActionsNewOrganization,
  mapGetters: mapGettersNewOrganization,
} = createNamespacedHelpers("subjects/organization/newOrganization");

export default {
  name: "cabinet-organization-edit-description",
  computed: {
    ...mapStateNewOrganization({
      newOrganization: (state) => state.newOrganization,
    }),
    ...mapGettersNewOrganization(["getIsDisabled"]),
  },
  methods: {
    ...mapMutationsNewOrganization([
      "setNewOrganizationEmail",
      "setNewOrganizationPhone",
      "setNewOrganizationAddress",
      "setNewOrganizationTitle",
      "setNewOrganizationTitleShort",
      "setNewOrganizationDescription",
    ]),
    ...mapActionsNewOrganization(["createOrganization"]),
  },
};
</script>
