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
                @input="(e) => setTitle(e.target.value)"
                :value="event.title"
                type="text"
                class="form__input-edit form__input-edit_width_full"
                id="reportsTabsSecondName"
                placeholder="Подходит срок заполнения формы №3456 за 30 (тридцать) календарных дней"
              />
            </div>
            <div class="admin_mailings__inp">
              <label for="adminSubjectDate" class="form__label"
                >Тип события</label
              >
              <select
                @change="(e) => setEventTypeId(e.target.value)"
                :value="event.eventTypeId"
                class="form__select form__select_theme_white"
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
                @input="(e) => setTheme(e.target.value)"
                :value="event.theme"
                type="text"
                class="form__input-edit form__input-edit_width_full"
                id="reportsTabsSecondName"
                placeholder="Подходит срок заполнения формы №3456 за 30 (тридцать) календарных дней"
              />
            </div>
            <div class="admin_mailings__inp">
              <label for="adminSubjectDate" class="form__label">Роль</label>
              <select
                @change="(e) => setRoleId(e.target.value)"
                :value="event.roleId"
                class="form__select form__select_theme_white"
              >
                <option value="" hidden>Выберите роль</option>
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
                @change="(e) => setRegionId(e.target.value)"
                :value="event.regionId"
                class="form__select form__select_theme_white"
              >
                <option value="" hidden>Выберите регион</option>
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
                @change="(e) => setPeriodId(e.target.value)"
                :value="event.periodId"
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
                @input="(e) => setSendAt(e.target.value)"
                :value="event.sendAt"
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
              :content="event.body"
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
              @click="saveEvent()"
            >
              Сохранить
            </button>
            <button
              type="submit"
              class="button button_theme_green button_border_small form__submit"
              @click="
                () => {
                  setStatusId(3);
                  saveEvent();
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
  },
};
</script>