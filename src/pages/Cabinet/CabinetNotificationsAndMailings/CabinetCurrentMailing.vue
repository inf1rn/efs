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
            {{ currentMailing?.title }}</span
          >
        </li>
      </ul>
      <div class="users__top">
        <h1 class="section-title">Редактирование рассылки</h1>
      </div>

      <div class="add-mailings__wrapper">
        <div class="tabs form-detail__tabs _tabs">
          <div class="admin_mailings__row add-row_inputs add-row">
            <div class="admin_mailings__inp inp-full">
              <label for="adminSubjectDate" class="form__label">Название</label>
              <input
                type="text"
                class="form__input-edit form__input-edit_width_full"
                id="reportsTabsSecondName"
                placeholder="Подходит срок заполнения формы №3456 за 30 (тридцать) календарных дней"
                :value="currentMailingForm?.title"
                @input="(e) => setTitle(e.target.value)"
              />
            </div>
            <div class="admin_mailings__inp">
              <label for="adminSubjectDate" class="form__label"
                >Тип события</label
              >
              <select
                :value="currentMailingForm?.eventTypeId"
                @change="(e) => setEventTypeId(e.target.value)"
                class="form__select form__select_theme_white"
              >
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
                type="text"
                class="form__input-edit form__input-edit_width_full"
                id="reportsTabsSecondName"
                placeholder="Подходит срок заполнения формы №3456 за 30 (тридцать) календарных дней"
                :value="currentMailingForm?.theme"
                @input="(e) => setTheme(e.target.value)"
              />
            </div>
            <div class="admin_mailings__inp">
              <label for="adminSubjectDate" class="form__label">Роль</label>
              <select
                :value="currentMailingForm?.roleId"
                class="form__select form__select_theme_white"
                @change="(e) => setRoleId(e.target.value)"
              >
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
                :value="currentMailingForm?.regionId"
                class="form__select form__select_theme_white"
                @change="(e) => setRegionId(e.target.value)"
              >
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
                :value="currentMailingForm?.periodId"
                @change="(e) => setPeriodId(e.target.value)"
                class="form__select form__select_theme_white"
              >
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
                @change="(e) => setSendAt(e.target.value)"
                type="date"
                name="date-from"
                class="form__input-edit form__input-edit_el_date-from"
                id="date-from"
                :value="currentMailingForm?.sendAt"
              />
            </div>
          </div>
          <div
            class="admin_mailings__row add-row_textarea add-row"
            style="width: 891px"
            v-if="this.currentMailingForm"
          >
            <QuilEditor
              :content="this.currentMailingForm?.body"
              contentType="html"
              @textChange="
                () => {
                  setBody($refs.editor.getHTML());
                }
              "
              ref="editor"
              theme="snow"
            />
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
              @click="updateMailing()"
            >
              Сохранить
            </button>
            <button
              type="submit"
              class="button button_theme_green button_border_small form__submit"
              @click="
                () => {
                  setStatusId(3);
                  updateMailing();
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
const {
  mapState: mapStateCurrentMailing,
  mapActions: mapActionsCurrentMailing,
  mapMutations: mapMutationsCurrentMailing,
} = createNamespacedHelpers("notificationsAndMailings/currentMailing");
const { mapState: mapStateFormData } = createNamespacedHelpers(
  "notificationsAndMailings"
);
const { mapState: mapStateRoles } = createNamespacedHelpers("account");
const { mapState: mapStateLocation } = createNamespacedHelpers("location");

export default {
  name: "cabinet-current-mailing",
  computed: {
    ...mapStateCurrentMailing({
      currentMailing: (state) => state.currentMailing,
      currentMailingForm: (state) => state.currentMailingForm,
    }),
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
    title() {
      return this.currentMailing?.title;
    },
  },
  methods: {
    ...mapActionsCurrentMailing(["fetchMailing", "updateMailing"]),
    ...mapMutationsCurrentMailing([
      "setCurrentMailingId",
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
  },
  created() {
    this.setCurrentMailingId(this.$route.params.mailingId);
    this.fetchMailing();
  },
};
</script>