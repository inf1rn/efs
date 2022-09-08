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
            :value="formOrganization?.title_short"
            @input="setFormOrganizationTitleShort($event.target.value)"
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
            :value="formOrganization?.title"
            @input="setFormOrganizationTitle($event.target.value)"
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
              :value="formOrganization?.phone"
              @input="setFormOrganizationPhone($event.target.value)"
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
            :value="formOrganization?.address"
            @input="setFormOrganizationAddress($event.target.value)"
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
            :value="formOrganization?.email"
            @input="setFormOrganizationEmail($event.target.value)"
          />
        </div>
      </div>
      <div
        class="admin_subject-edit__block block_white"
        v-if="formOrganization"
      >
        <div class="admin_subject-edit_tabs-form__line form__item">
          <label for="adminSubjectEditDesc" class="form__label">Описание</label>
          <QuilEditor
            :content="formOrganization?.description"
            contentType="html"
            class="spollers-body__input form-input__border form-input__textarea"
            ref="editor"
            id="adminSubjectEditDesc"
            @textChange="
              () => {
                setFormOrganizationDescription($refs.editor.getHTML());
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
        @click="updateOrganization()"
      >
        Сохранить
      </button>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: mapStateEditOrganization,
  mapMutations: mapMutationsEditOrganization,
  mapActions: mapActionsEditOrganization,
} = createNamespacedHelpers("subjects/organization/organizationEdit");

export default {
  name: "cabinet-organization-edit-description",
  computed: {
    ...mapStateEditOrganization({
      formOrganization: (state) => state.formOrganization,
    }),
  },
  methods: {
    ...mapMutationsEditOrganization([
      "setFormOrganizationEmail",
      "setFormOrganizationPhone",
      "setFormOrganizationAddress",
      "setFormOrganizationTitle",
      "setFormOrganizationTitleShort",
      "setFormOrganizationDescription",
    ]),
    ...mapActionsEditOrganization(["updateOrganization"]),
  },
};
</script>