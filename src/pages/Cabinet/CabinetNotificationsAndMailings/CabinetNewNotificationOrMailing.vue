<template>
  <main class="content content_cabinet">
    <section class="add-mailings page__section">
      <ul class="breadcrumbs page__breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link
            :to="{ name: 'notifications-and-mailings-home' }"
            class="breadcrumbs__link"
            >Уведомления и рассылки</router-link
          >
        </li>
        <li class="breadcrumbs__item">
          <span href="#" class="breadcrumbs__link breadcrumbs__link_current">
            новое уведомление или рассылка</span
          >
        </li>
      </ul>
      <div class="users__top">
        <h1 class="section-title">новое уведомление или рассылка</h1>
      </div>

      <div class="add-mailings__wrapper">
        <div class="tabs form-detail__tabs _tabs">
          <div class="admin_mailings__row add-row_inputs add-row">
            <div class="admin_mailings__inp inp-full">
              <label for="adminSubjectDate" class="form__label">Название</label>
              <input
                v-model="title"
                type="text"
                class="form__input-edit form__input-edit_width_full"
                :class="{
                  invalid: v$.title.$error,
                }"
                id="reportsTabsSecondName"
                placeholder="Подходит срок заполнения формы №3456 за 30 (тридцать) календарных дней"
              />
            </div>
            <div class="admin_mailings__inp">
              <label for="adminSubjectDate" class="form__label"
                >Тип события</label
              >
              <select
                v-model="eventTypeId"
                class="form__select form__select_theme_white"
                :class="{
                  invalid: v$.eventTypeId.$error,
                }"
              >
                <option value="" hidden>Выберите тип события</option>
                <option
                  v-for="eventType in eventTypes"
                  :key="eventType.id"
                  :value="eventType.id"
                >
                  {{ eventType.title }}
                </option>
              </select>
            </div>
          </div>
          <div class="admin_mailings__row add-row_inputs add-row">
            <div class="admin_mailings__inp inp-full">
              <label for="adminSubjectDate" class="form__label">Тема</label>
              <input
                v-model="theme"
                type="text"
                class="form__input-edit form__input-edit_width_full"
                :class="{
                  invalid: v$.theme.$error,
                }"
                id="reportsTabsSecondName"
                placeholder="Подходит срок заполнения формы №3456 за 30 (тридцать) календарных дней"
              />
            </div>
            <div class="admin_mailings__inp">
              <label for="adminSubjectDate" class="form__label">Роль</label>
              <select
                v-model="roleId"
                :class="{
                  invalid: v$.roleId.$error,
                }"
                class="form__select form__select_theme_white"
              >
                <option value="">Все роли</option>
                <option v-for="role in roles" :key="role.id" :value="role.id">
                  {{ role.title }}
                </option>
              </select>
            </div>
          </div>
          <div class="admin_mailings__row add-row_inputs add-row">
            <div class="admin_mailings__inp">
              <label for="adminSubjectDate" class="form__label">Регион</label>
              <select
                v-model="regionId"
                :class="{
                  invalid: v$.regionId.$error,
                }"
                class="form__select form__select_theme_white"
              >
                <option value="">Все</option>
                <option
                  v-for="region in regions"
                  :key="region.id"
                  :value="region.id"
                >
                  {{ region.title }}
                </option>
              </select>
            </div>
            <div class="admin_mailings__inp">
              <label for="adminSubjectDate" class="form__label"
                >Периодичность</label
              >
              <select
                v-model="periodId"
                :class="{
                  invalid: v$.periodId.$error,
                }"
                class="form__select form__select_theme_white"
              >
                <option value="" hidden>Выберите периодичность</option>
                <option
                  v-for="periodType in periodTypes"
                  :key="periodType.id"
                  :value="periodType.id"
                >
                  {{ periodType.title }}
                </option>
              </select>
            </div>
            <div class="admin_mailings__inp inp-date">
              <label for="adminSubjectDate" class="form__label"
                >Дата отправки</label
              >
              <input
                v-model="sendAt"
                :class="{
                  invalid: v$.sendAt.$error,
                }"
                type="date"
                name="date-from"
                class="form__input-edit form__input-edit_el_date-from"
                id="date-from"
              />
            </div>
          </div>
          <div
            class="admin_mailings__row add-row_textarea add-row"
            style="width: 891px"
          >
            <QuilEditor
              :content="body"
              contentType="html"
              @textChange="
                () => {
                  body = $refs.editor.getHTML();
                }
              "
              ref="editor"
              theme="snow"
            />
            <small v-if="v$.body.$error" style="color: red"
              >Заполните тело рассылки</small
            >
          </div>
          <div class="checkbox form-group"></div>
          <div class="admin_mailings__row add-row_btns add-row">
            <button
              type="submit"
              class="
                button
                button_theme_green--empty
                button_border_small
                form__submit
              "
              @click="saveEventHandler()"
            >
              Сохранить
            </button>
            <button
              type="submit"
              class="button button_theme_green button_border_small form__submit"
              @click="
                () => {
                  setStatusId(3);
                  saveEventHandler();
                }
              "
            >
              Сохранить и отправить
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import { mailingEditorMixin } from "@/mixins/components/mailingEditorMixin";
import useVuelidate from "@vuelidate/core";

const {
  mapState: mapStateNewEvent,
  mapActions: mapActionsNewEvent,
  mapMutations: mapMutationsNewEvent,
} = createNamespacedHelpers("notificationsAndMailings/newEvent");
const { mapState: mapStateFormData } = createNamespacedHelpers(
  "notificationsAndMailings"
);
const { mapState: mapStateRoles } = createNamespacedHelpers("account");
const { mapState: mapStateLocation } = createNamespacedHelpers("location");

export default {
  name: "cabinet-current-notification",
  title: "Новая рассылка или уведомление",
  mixins: [mailingEditorMixin],
  computed: {
    ...mapStateFormData({
      eventTypes: (state) => state.eventTypes,
      periodTypes: (state) => state.periodTypes,
    }),
    ...mapStateRoles({
      roles: (state) => state.roles,
    }),
    ...mapStateLocation({
      regions: (state) => state.regions,
    }),
    ...mapStateNewEvent({
      event: (state) => state.event,
    }),
    title: {
      get() {
        return this.event.title;
      },
      set(value) {
        this.setTitle(value);
        this.v$.title.$touch();
      },
    },
    sendAt: {
      get() {
        return this.event.sendAt;
      },
      set(value) {
        this.setSendAt(value);
        this.v$.sendAt.$touch();
      },
    },
    theme: {
      get() {
        return this.event.theme;
      },

      set(value) {
        this.setTheme(value);
        this.v$.theme.$touch();
      },
    },
    typeId: {
      get() {
        return this.event.typeId;
      },
      set(value) {
        this.setEventTypeId(value);
        this.v$.typeId.$touch();
      },
    },
    roleId: {
      get() {
        return this.event.roleId;
      },
      set(value) {
        this.setRoleId(value);
        this.v$.roleId.$touch();
      },
    },
    regionId: {
      get() {
        return this.event.regionId;
      },
      set(value) {
        this.setRegionId(value);
        this.v$.regionId.$touch();
      },
    },
    periodId: {
      get() {
        return this.event.periodId;
      },
      set(value) {
        this.setPeriodId(value);
        this.v$.periodId.$touch();
      },
    },
    eventTypeId: {
      get() {
        return this.event.eventTypeId;
      },
      set(value) {
        this.setEventTypeId(value);
        this.v$.eventTypeId.$touch();
      },
    },
    body: {
      get() {
        return this.event.body;
      },
      set(value) {
        this.setBody(value);
        this.v$.body.$touch();
      },
    },
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations: function () {
    return this.getValidations();
  },
  methods: {
    ...mapActionsNewEvent(["saveEvent"]),
    ...mapMutationsNewEvent([
      "setTitle",
      "setTheme",
      "setSendAt",
      "setRegionId",
      "setFormId",
      "setPeriodId",
      "setStatusId",
      "setEventTypeId",
      "setBody",
      "setRoleId",
    ]),
    async saveEventHandler() {
      const isCorrect = await this.v$.$validate();

      if (!isCorrect) {
        return;
      }
      this.saveEvent();
      this.v$.$reset();
    },
  },
};
</script>