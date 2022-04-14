<template>
  <div class="tabs__body _tabs-block">
    <div class="admin_mailings__row row-inputs">
      <div class="admin_mailings__inp input-date">
        <label for="adminSubjectDate" class="form__label">Датa</label>
        <input
          :value="filters.date"
          @change="(e) => setFiltersDate(e.target.value)"
          type="date"
          name="date-from"
          class="form__input-edit form__input-edit_el_date-from"
          id="date-from"
        />
      </div>
      <div class="admin_mailings__inp">
        <label for="adminSubjectDate" class="form__label">Роль</label>
        <select
          :value="filters.roleId"
          @change="(e) => setFiltersRoleId(e.target.value)"
          class="form__select form__select_theme_white"
        >
          <option value="" hidden>Выберите роль</option>
          <option v-for="role in roles" :value="role.id" :key="role.id">
            {{ role.title }}
          </option>
        </select>
      </div>
      <div class="admin_mailings__inp">
        <label for="adminSubjectDate" class="form__label">Регион</label>
        <select
          :value="filters.regionId"
          @change="(e) => setFiltersRegionId(e.target.value)"
          class="form__select form__select_theme_white"
        >
          <option value="" hidden>Выберите регион</option>
          <option v-for="region in regions" :value="region.id" :key="region.id">
            {{ region.title }}
          </option>
        </select>
      </div>
      <div class="admin_mailings__inp">
        <div class="admin_mailings__link">
          <a
            @click="clearFilters()"
            href="#"
            class="filter__reset-link reports-search__reset-link"
            >Сбросить</a
          >
        </div>
      </div>
    </div>
    <div class="admin_mailings__row row-table">
      <div class="row-table__top">
        <div class="row-table__found table-found">
          Найдено {{ pagination?.total }}
        </div>
      </div>
      <table class="table listeners__table users__table">
        <tbody>
          <tr class="table__row table__row_head">
            <th class="table__header">№ рассылки</th>
            <th class="table__header">Уведомление</th>
            <th class="table__header">Дата отправки</th>
            <th class="table__header">Статус</th>
            <th class="table__header">Роль</th>
            <th class="table__header">Регион</th>
            <th class="table__header">№ связанной рассылки</th>
            <th class="table__header">Удалить</th>
            <th class="table__header"></th>
          </tr>
          <tr
            @click="
              $router.push(
                `/cabinet/notifications-and-mailings/mailings/${mailing.id}`
              )
            "
            class="table__row"
            v-for="mailing in mailings"
            :key="mailing.id"
          >
            <td class="table__cell">{{ mailing.id }}</td>
            <td class="table__cell">
              {{ mailing.title }}
            </td>
            <td class="table__cell">
              {{
                new Date(mailing.send_at).toLocaleString("ru-RU").slice(0, 10)
              }}
            </td>
            <td class="table__cell">{{ mailing.status.title }}</td>
            <td class="table__cell">{{ mailing.role.title }}</td>
            <td class="table__cell">{{ mailing.region.title }}</td>
            <td class="table__cell">4567</td>
            <td class="table__cell">
              <button
                @click.stop="deleteHandler(mailing.id)"
                class="button button_theme_red button_border_small"
              >
                Удалить
              </button>
            </td>
            <td class="table__cell">
              <button class="table__cell-users_row-more">
                <img src="@/assets/images/more_dots.svg" alt="more" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="table-pagination">
        <div class="table-pagination__count">
          {{ firstItemNumber }}-{{ lastItemNumber }} из {{ pagination?.total }}
        </div>
        <div class="table-pagination__bullets">
          <button class="bullets-left _disabled" @click="setPrevPage()">
            <img src="@/assets/images/table-pagination/left.svg" alt="left" />
          </button>
          <button class="bullets-right" @click="setNextPage()">
            <img src="@/assets/images/table-pagination/right.svg" alt="right" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: mapStateMailings,
  mapActions: mapActionsMailings,
  mapMutations: mapMutationsMailings,
} = createNamespacedHelpers("notificationsAndMailings/mailings");
const { mapState: mapStateRoles } = createNamespacedHelpers("account");
const { mapState: mapStateLocation } = createNamespacedHelpers("location");

export default {
  name: "cabinet-mailings",
  title: "Рассылки",
  computed: {
    ...mapStateMailings({
      mailings: (state) => state.mailings,
      filters: (state) => state.filters,
      pagination: (state) => state.pagination,
    }),
    ...mapStateRoles({
      roles: (state) => state.roles,
    }),
    ...mapStateLocation({
      regions: (state) => state.regions,
    }),
    firstItemNumber() {
      if (!this.pagination) {
        return;
      }
      const { current_page, per_page } = this.pagination;
      return (current_page - 1) * per_page + 1;
    },
    lastItemNumber() {
      if (!this.pagination) {
        return;
      }
      const { current_page, count } = this.pagination;
      return this.firstItemNumber + count - 1;
    },
  },
  methods: {
    ...mapActionsMailings([
      "fetchMailings",
      "setFiltersRoleId",
      "setFiltersDate",
      "setFiltersRegionId",
      "clearFilters",
      "setNextPage",
      "setPrevPage",
      "deleteMailing",
    ]),
    ...mapMutationsMailings(["setRemovableMailingId"]),
    deleteHandler(id) {
      this.setRemovableMailingId(id);
      this.deleteMailing();
    },
  },
  created() {
    this.fetchMailings();
  },
};
</script>